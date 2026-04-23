# Guia de Configuração de MCP Servers

Este guia explica como adicionar e configurar MCP (Model Context Protocol) servers no projeto Ice Star.

## 📍 Localização do Arquivo de Configuração

O arquivo de configuração MCP está localizado em:

```
.kiro/settings/mcp.json
```

## 🔧 Estrutura Básica

```json
{
  "mcpServers": {
    "nome-do-server": {
      "command": "comando-para-executar",
      "args": ["argumentos", "do", "comando"],
      "env": {
        "VARIAVEL_AMBIENTE": "valor"
      },
      "disabled": false,
      "autoApprove": ["nome-da-tool"]
    }
  }
}
```

## 📝 Campos Explicados

### `nome-do-server`
- Identificador único do servidor
- Use kebab-case (ex: `database-server`, `file-system`)

### `command`
- Comando para executar o servidor
- Exemplos comuns:
  - `"uvx"` - Para servidores Python via uv
  - `"node"` - Para servidores Node.js
  - `"npx"` - Para pacotes npm

### `args`
- Array de argumentos passados ao comando
- Para uvx: `["nome-do-pacote@latest"]`
- Para node: `["caminho/para/server.js"]`

### `env`
- Variáveis de ambiente para o servidor
- Comum: `"FASTMCP_LOG_LEVEL": "ERROR"` para reduzir logs

### `disabled`
- `false`: Servidor ativo
- `true`: Servidor desabilitado (não será iniciado)

### `autoApprove`
- Array de nomes de tools que não precisam de aprovação manual
- Exemplo: `["read_file", "list_directory"]`
- Use `[]` para aprovar manualmente todas as tools

## 📦 Exemplos de Configuração

### 1. Servidor de Sistema de Arquivos

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "uvx",
      "args": ["mcp-server-filesystem@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["read_file", "list_directory"]
    }
  }
}
```

### 2. Servidor de Banco de Dados (PostgreSQL)

```json
{
  "mcpServers": {
    "postgres": {
      "command": "uvx",
      "args": ["mcp-server-postgres@latest"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/dbname",
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### 3. Servidor de Git

```json
{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["git_status", "git_log"]
    }
  }
}
```

### 4. Servidor Customizado (Node.js)

```json
{
  "mcpServers": {
    "custom-server": {
      "command": "node",
      "args": ["./mcp-servers/custom-server.js"],
      "env": {
        "API_KEY": "sua-chave-api",
        "NODE_ENV": "development"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### 5. Múltiplos Servidores

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "uvx",
      "args": ["mcp-server-filesystem@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["read_file"]
    },
    "database": {
      "command": "uvx",
      "args": ["mcp-server-postgres@latest"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/istar",
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": true,
      "autoApprove": []
    }
  }
}
```

## 🚀 Como Adicionar um Novo MCP Server

### Passo 1: Editar o arquivo de configuração

Abra `.kiro/settings/mcp.json` e adicione seu servidor:

```json
{
  "mcpServers": {
    "seu-novo-server": {
      "command": "uvx",
      "args": ["nome-do-pacote@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Passo 2: Instalar dependências (se necessário)

Para servidores Python via `uvx`, você precisa ter o `uv` instalado:

**Windows (PowerShell):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Passo 3: Reiniciar o servidor Kiro

Os servidores MCP são carregados quando o Kiro inicia. Para aplicar as mudanças:

1. Salve o arquivo `mcp.json`
2. Recarregue a janela do VS Code (Ctrl+Shift+P → "Reload Window")

OU

Use o comando do Kiro para reconectar servidores:
- Abra a Command Palette (Ctrl+Shift+P)
- Digite "MCP"
- Selecione "Reconnect MCP Servers"

### Passo 4: Verificar se o servidor está funcionando

1. Abra o painel MCP Server view no Kiro
2. Verifique se seu servidor aparece na lista
3. Status deve estar "running" (verde)

## 🔍 Servidores MCP Populares

### Desenvolvimento
- `mcp-server-filesystem` - Acesso ao sistema de arquivos
- `mcp-server-git` - Operações Git
- `mcp-server-github` - Integração com GitHub

### Banco de Dados
- `mcp-server-postgres` - PostgreSQL
- `mcp-server-mysql` - MySQL
- `mcp-server-sqlite` - SQLite
- `mcp-server-mongodb` - MongoDB

### APIs e Serviços
- `mcp-server-fetch` - HTTP requests
- `mcp-server-slack` - Integração Slack
- `mcp-server-google-drive` - Google Drive

### Documentação
- `awslabs.aws-documentation-mcp-server` - AWS Docs
- `mcp-server-docs` - Documentação geral

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente Sensíveis

Para dados sensíveis (API keys, senhas), use variáveis de ambiente do sistema:

```json
{
  "mcpServers": {
    "api-server": {
      "command": "node",
      "args": ["./server.js"],
      "env": {
        "API_KEY": "${API_KEY}",
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Defina as variáveis no sistema antes de iniciar o Kiro.

### Timeout Customizado

Alguns servidores podem precisar de mais tempo para iniciar:

```json
{
  "mcpServers": {
    "slow-server": {
      "command": "uvx",
      "args": ["slow-package@latest"],
      "env": {
        "STARTUP_TIMEOUT": "30000"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Logs Detalhados

Para debug, aumente o nível de log:

```json
{
  "env": {
    "FASTMCP_LOG_LEVEL": "DEBUG"
  }
}
```

Níveis disponíveis: `ERROR`, `WARN`, `INFO`, `DEBUG`

## 🐛 Troubleshooting

### Servidor não inicia

1. Verifique se o comando está correto
2. Verifique se as dependências estão instaladas
3. Verifique os logs no painel MCP Server
4. Tente com `"disabled": false`

### Servidor inicia mas não responde

1. Verifique as variáveis de ambiente
2. Verifique se as portas necessárias estão disponíveis
3. Aumente o log level para DEBUG
4. Verifique a documentação do servidor específico

### Tools não aparecem

1. Verifique se o servidor está "running"
2. Reconecte os servidores MCP
3. Recarregue a janela do VS Code

## 📚 Recursos Adicionais

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
- [Creating Custom MCP Servers](https://modelcontextprotocol.io/docs/creating-servers)

## 💡 Dicas

1. **Comece simples**: Adicione um servidor por vez
2. **Use autoApprove com cuidado**: Apenas para tools seguras
3. **Mantenha logs em ERROR**: Para melhor performance
4. **Documente suas configurações**: Adicione comentários (em arquivos separados)
5. **Teste em desenvolvimento**: Antes de usar em produção

## 🔐 Segurança

- ⚠️ Nunca commite API keys ou senhas no `mcp.json`
- ✅ Use variáveis de ambiente para dados sensíveis
- ✅ Adicione `.kiro/settings/mcp.json` ao `.gitignore` se contiver segredos
- ✅ Use `autoApprove` apenas para tools que você confia completamente

## 📝 Template para Novo Servidor

Copie e adapte este template:

```json
{
  "mcpServers": {
    "NOME-DO-SEU-SERVER": {
      "command": "COMANDO",
      "args": ["ARGUMENTOS"],
      "env": {
        "VARIAVEL": "VALOR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Substitua:
- `NOME-DO-SEU-SERVER`: Nome único em kebab-case
- `COMANDO`: `uvx`, `node`, `npx`, etc.
- `ARGUMENTOS`: Argumentos necessários
- `VARIAVEL`/`VALOR`: Variáveis de ambiente necessárias
