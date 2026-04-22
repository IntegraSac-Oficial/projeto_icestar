# Ice Star - Projeto Completo

Sistema completo para a Ice Star, incluindo landing page e painel administrativo para gerenciamento de conteúdo.

## Sobre o Projeto

Este projeto consiste em uma aplicação Next.js completa com:

- **Landing Page Responsiva**: Site institucional da Ice Star
- **Painel Administrativo**: Sistema para gerenciar conteúdo do site
- **Sistema de Autenticação**: Login seguro para administradores
- **Upload de Logo**: Gerenciamento de logo da empresa
- **Banco de Dados**: MySQL com migrações e seeds

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 6.0.3 (strict mode)
- **Database**: MySQL 8.0 com mysql2
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS 3.4.19
- **UI Library**: React 19.2.5
- **Form Handling**: React Hook Form 7.72.1 com Zod 4.3.6
- **Icons**: Lucide React 1.8.0

## Estrutura do Projeto

```
projeto_icestar/
├── src/
│   ├── app/
│   │   ├── admin/              # Painel administrativo
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileMenu
│   │   ├── sections/           # Seções da landing page
│   │   └── ui/                 # Componentes reutilizáveis
│   ├── lib/
│   │   ├── auth/               # Configuração de autenticação
│   │   ├── db/                 # Conexão com banco de dados
│   │   ├── services/           # Serviços de negócio
│   │   └── validations/        # Schemas de validação
│   └── types/                  # Definições TypeScript
├── database/
│   └── init/                   # Scripts SQL de migração
├── scripts/                    # Scripts utilitários
└── public/                     # Arquivos estáticos
```

## Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- MySQL 8.0
- Docker (opcional, para MySQL via Docker Compose)

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados

#### Opção A: Docker Compose (Recomendado)

```bash
docker-compose up -d
```

#### Opção B: MySQL Local

Configure as variáveis no `.env.local` com suas credenciais MySQL.

### 3. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no exemplo:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3307
DATABASE_NAME=istar
DATABASE_USER=istar_user
DATABASE_PASSWORD=istar_password

# NextAuth.js
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=http://localhost:3000
```

### 4. Executar Migrações

Execute os scripts SQL na pasta `database/init/` na ordem:

1. `01-create-tables.sql`
2. `02-admin-panel-tables.sql`
3. `03-initial-admin-seed.sql`
4. `04-migrate-content-seed.sql`

### 5. Iniciar o Servidor

```bash
npm run dev
```

## Acesso ao Sistema

### Landing Page
- URL: http://localhost:3000
- Acesso público

### Painel Administrativo
- URL: http://localhost:3000/admin/login
- **Email**: `admin@icestar.com`
- **Senha**: `IceStar2024!Admin#Secure`

## Funcionalidades

### Landing Page
- ✅ Design responsivo (320px - 1920px)
- ✅ Navegação fixa com scroll suave
- ✅ Menu mobile com ícone hamburger
- ✅ Seção hero com CTAs
- ✅ Showcase de serviços
- ✅ Aplicações veiculares
- ✅ Diferenciais competitivos
- ✅ Formulário de contato com validação
- ✅ Footer completo
- ✅ Conteúdo dinâmico do banco de dados

### Painel Administrativo
- ✅ Sistema de autenticação seguro
- ✅ Dashboard com resumo
- ✅ Editores de conteúdo para todas as seções
- ✅ Upload e gerenciamento de logo
- ✅ Histórico de alterações
- ✅ Interface responsiva
- ✅ Validação de formulários
- ✅ Mensagens em português

### Recursos Técnicos
- ✅ TypeScript em modo strict
- ✅ Validação com Zod
- ✅ Cache de conteúdo (5 minutos)
- ✅ Encoding UTF-8 completo
- ✅ Tratamento de erros
- ✅ Logs de auditoria
- ✅ Transações de banco de dados

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run dev:webpack      # Desenvolvimento sem Turbopack

# Produção
npm run build           # Build de produção
npm start              # Servidor de produção

# Qualidade de Código
npm run lint           # Linting
npm run type-check     # Verificação de tipos

# Scripts Utilitários
npx tsx scripts/test-charset-save.ts           # Testar encoding UTF-8
npx tsx scripts/fix-content-encoding.ts       # Corrigir encoding
npx tsx scripts/generate-admin-hash.ts        # Gerar hash de senha
```

## Estrutura do Banco de Dados

### Tabelas Principais

- `admin_users`: Usuários administrativos
- `content_sections`: Conteúdo das seções do site
- `content_history`: Histórico de alterações
- `logos`: Logos da empresa

## Contribuição

Este é um projeto privado da Ice Star. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Projeto privado da Ice Star - Todos os direitos reservados.
