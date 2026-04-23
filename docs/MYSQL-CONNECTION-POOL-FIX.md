# Correção do Problema "Too Many Connections" no MySQL

## Problema

O site estava apresentando o erro:
```
Error: Too many connections
errno: 1040
sqlMessage: 'Too many connections'
```

## Causa Raiz

1. **Limite padrão do MySQL**: O MySQL 8.0 tem um limite padrão de 151 conexões simultâneas
2. **Pool de conexões mal configurado**: O pool estava configurado com `connectionLimit: 10`, mas sem gerenciamento adequado de conexões ociosas
3. **Hot reload do Next.js**: Durante o desenvolvimento, o Next.js faz hot reload frequente, criando novos pools sem liberar os antigos
4. **Múltiplas queries simultâneas**: A página inicial faz várias queries ao mesmo tempo (hero, about, cta, contact_form, gallery, logo, footer)

## Soluções Implementadas

### 1. Ajuste do Pool de Conexões (`src/lib/db/connection.ts`)

**Antes**:
```typescript
connectionLimit: 10,
queueLimit: 0,
```

**Depois**:
```typescript
connectionLimit: 5,        // Reduzido para evitar esgotar o limite
maxIdle: 5,               // Máximo de conexões ociosas
idleTimeout: 60000,       // Timeout de 60s para conexões ociosas
queueLimit: 0,
```

**Benefícios**:
- Menos conexões simultâneas (5 em vez de 10)
- Conexões ociosas são fechadas automaticamente após 60 segundos
- Melhor gerenciamento de recursos

### 2. Aumento do Limite de Conexões do MySQL

**Limite anterior**: 151 conexões  
**Limite novo**: 200 conexões

**Como foi feito**:

#### Temporário (até reiniciar o container):
```bash
npx tsx scripts/fix-mysql-connections.ts
```

#### Permanente (docker-compose.yml):
```yaml
command: --default-authentication-plugin=mysql_native_password --max-connections=200
```

### 3. Script de Diagnóstico

Criado script `scripts/fix-mysql-connections.ts` que:
- ✅ Verifica o limite atual de conexões
- ✅ Lista todas as conexões ativas
- ✅ Mostra detalhes de cada conexão (ID, usuário, banco, comando, tempo)
- ✅ Aumenta o limite de conexões para 200

## Como Usar

### Verificar Status das Conexões

```bash
npx tsx scripts/fix-mysql-connections.ts
```

### Reiniciar MySQL (se necessário)

```bash
docker-compose restart istar_db
```

### Aplicar Mudanças Permanentes

```bash
docker-compose down
docker-compose up -d
```

## Monitoramento

### Verificar Conexões Ativas no MySQL

```sql
SHOW PROCESSLIST;
```

### Verificar Limite de Conexões

```sql
SHOW VARIABLES LIKE 'max_connections';
```

### Verificar Uso Atual

```sql
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';
```

## Boas Práticas

### 1. Sempre Liberar Conexões

```typescript
// ❌ Ruim - não libera conexão
const connection = await getConnection();
await connection.query('SELECT * FROM users');

// ✅ Bom - libera conexão
const connection = await getConnection();
try {
  await connection.query('SELECT * FROM users');
} finally {
  connection.release();
}
```

### 2. Usar Pool para Queries Simples

```typescript
// ✅ Melhor - usa pool automaticamente
import { query } from '@/lib/db/connection';
await query('SELECT * FROM users');
```

### 3. Usar Conexão Dedicada para Transações

```typescript
const connection = await getConnection();
try {
  await connection.beginTransaction();
  await connection.query('INSERT INTO users ...');
  await connection.query('INSERT INTO logs ...');
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
```

## Configuração de Produção

Para produção (Coolify), certifique-se de:

1. **Aumentar o limite de conexões do MySQL**:
   - Editar configuração do banco no Coolify
   - Adicionar variável de ambiente: `MYSQL_MAX_CONNECTIONS=200`

2. **Ajustar o pool de conexões**:
   - Manter `connectionLimit: 5` para cada instância da aplicação
   - Se tiver múltiplas instâncias, calcular: `total_connections = instances * connectionLimit`

3. **Monitorar uso de conexões**:
   - Configurar alertas para quando atingir 80% do limite
   - Revisar logs regularmente

## Troubleshooting

### Erro persiste após as mudanças

1. Reiniciar o container MySQL:
   ```bash
   docker-compose restart istar_db
   ```

2. Verificar se há processos travados:
   ```sql
   SHOW PROCESSLIST;
   -- Matar processos travados:
   KILL <process_id>;
   ```

3. Reiniciar a aplicação Next.js (Ctrl+C e `npm run dev`)

### Conexões não são liberadas

1. Verificar se há queries de longa duração:
   ```sql
   SELECT * FROM information_schema.processlist 
   WHERE time > 60 
   ORDER BY time DESC;
   ```

2. Adicionar timeout nas queries:
   ```typescript
   const pool = getPool();
   pool.query({
     sql: 'SELECT * FROM large_table',
     timeout: 10000 // 10 segundos
   });
   ```

## Arquivos Modificados

- ✅ `src/lib/db/connection.ts` - Configuração do pool otimizada
- ✅ `docker-compose.yml` - Limite de conexões aumentado
- ✅ `scripts/fix-mysql-connections.ts` - Script de diagnóstico criado
- ✅ `docs/MYSQL-CONNECTION-POOL-FIX.md` - Esta documentação

## Referências

- [MySQL Connection Pool Best Practices](https://github.com/sidorares/node-mysql2#using-connection-pools)
- [MySQL max_connections Documentation](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_connections)
- [Next.js Database Connection Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

---

**Data**: 23 de Abril de 2026  
**Problema**: Too many connections (errno: 1040)  
**Status**: ✅ Resolvido
