# 🗄️ Novo Banco de Dados Ice Star

## ✅ Status

- ✅ Banco antigo `default` deletado
- ✅ Novo banco `db_icestar` criado
- ✅ Banco iniciado e rodando

---

## 📊 Informações de Conexão

### Banco de Dados MySQL no Coolify

**UUID do Banco**: `t12vikwinjbdh1pfr7uq6ld6`

**Nome do Container**: `t12vikwinjbdh1pfr7uq6ld6`

**Credenciais**:
- **Host**: `t12vikwinjbdh1pfr7uq6ld6` (nome do container)
- **Porta**: `3306`
- **Banco de Dados**: `default` (nome interno do MySQL)
- **Usuário**: `mysql`
- **Senha**: `sJYKzs82oECPEBq6xbVawhnzCxsKmH5DSeS5a5nNfJDqB0jLWeQMdi4rSUlobFcr`
- **Usuário Root**: `root`
- **Senha Root**: `CRoDeV7E4cj5HpGjgqFwk4LsEjjb4e2JQpsKmBz9xPqW7VTrBWwewRuNJXRemXSx`

**Connection String**:
```
mysql://mysql:sJYKzs82oECPEBq6xbVawhnzCxsKmH5DSeS5a5nNfJDqB0jLWeQMdi4rSUlobFcr@t12vikwinjbdh1pfr7uq6ld6:3306/default
```

---

## 🔧 Atualizar phpMyAdmin

O phpMyAdmin precisa ser atualizado para conectar ao novo banco. Vou fazer isso agora...

---

## 📥 Como Importar Seus Dados Locais

### Opção 1: Via phpMyAdmin (Recomendado)

1. Acesse o phpMyAdmin (após eu atualizar a configuração)
2. Selecione o banco `default` no menu lateral
3. Clique na aba **Importar**
4. Escolha o arquivo SQL do seu backup local
5. Clique em **Executar**

### Opção 2: Via Linha de Comando (Avançado)

Se você tiver acesso SSH ao servidor:

```bash
mysql -h t12vikwinjbdh1pfr7uq6ld6 -u root -p default < seu_backup.sql
```

Senha root: `CRoDeV7E4cj5HpGjgqFwk4LsEjjb4e2JQpsKmBz9xPqW7VTrBWwewRuNJXRemXSx`

---

## 🔄 Próximos Passos

1. ✅ Banco criado e rodando
2. ⏳ Atualizar phpMyAdmin para conectar ao novo banco
3. ⏳ Importar dados do ambiente local
4. ⏳ Atualizar aplicação Next.js para usar o novo banco
5. ⏳ Testar o sistema

---

## ⚠️ Observações Importantes

- O nome interno do banco MySQL ainda é `default` (isso é padrão do Coolify)
- O nome do recurso no Coolify é `db_icestar`
- Quando importar seus dados, eles vão para o banco `default` dentro do container
- Isso está correto e é o comportamento esperado!
