# 🔄 Guia de Migração do Banco de Dados

## Objetivo
Renomear o banco de dados de `default` para `db_icestar`

---

## 📋 Passo a Passo

### 1️⃣ Executar Script SQL no phpMyAdmin

1. Acesse o phpMyAdmin: http://phpmyadmin-ezjv6sutn3abybj5xh7hie36.192.168.100.218.sslip.io

2. Clique na aba **SQL** no topo da página

3. Abra o arquivo `database/migrate-to-icestar-db.sql` neste projeto

4. **Copie todo o conteúdo** do arquivo SQL

5. **Cole** no campo de texto do phpMyAdmin

6. Clique em **Executar** (botão no canto inferior direito)

7. **Verifique os resultados**:
   - Você deve ver uma tabela mostrando a contagem de registros
   - Certifique-se de que `banco_antigo` = `banco_novo` para todas as tabelas
   - Exemplo esperado:
     ```
     tabela              | banco_antigo | banco_novo
     --------------------|--------------|------------
     admins              | 1            | 1
     content_sections    | 6            | 6
     logos               | 1            | 1
     ```

8. No menu lateral esquerdo, você deve ver agora dois bancos:
   - `default` (antigo)
   - `db_icestar` (novo) ✅

---

### 2️⃣ Atualizar Configuração do MySQL no Coolify

**IMPORTANTE**: Esta etapa precisa ser feita via API do Coolify, pois não há interface web para alterar o nome do banco.

Vou fazer isso por você usando o MCP do Coolify...

---

### 3️⃣ Reiniciar Aplicação

Após a atualização do banco, a aplicação Next.js precisa ser reiniciada para usar o novo banco.

---

### 4️⃣ Testar o Sistema

1. Acesse o painel admin: http://localhost:3000/admin
2. Faça login
3. Teste todas as funcionalidades:
   - ✅ Editar conteúdo das seções
   - ✅ Upload de logo
   - ✅ Visualizar dashboard
4. Verifique se os dados estão sendo salvos corretamente

---

### 5️⃣ Deletar Banco Antigo (Após Confirmar que Tudo Funciona)

⚠️ **ATENÇÃO**: Só execute este passo depois de ter certeza absoluta de que tudo está funcionando!

1. Acesse o phpMyAdmin
2. Clique na aba **SQL**
3. Execute o comando:
   ```sql
   DROP DATABASE `default`;
   ```

---

## 🎯 Status Atual

- ✅ Script SQL criado
- ⏳ Aguardando execução no phpMyAdmin
- ⏳ Atualização da configuração do Coolify
- ⏳ Testes do sistema
- ⏳ Remoção do banco antigo

---

## 📞 Suporte

Se encontrar algum problema durante a migração, me avise imediatamente antes de prosseguir para o próximo passo!
