# 🚀 Configuração de Produção no Coolify

## 📋 Informações da Aplicação

**UUID da Aplicação**: `b3vpcsuf6xxh99wdmb8ax5ml`  
**Nome**: `projeto_icestar:main-yc4w0cawspfzwtrmhebf1qpq`  
**Repositório**: `IntegraSac-Oficial/projeto_icestar`  
**Branch**: `main`  
**Domínio Atual**: `http://icestar.icevanisolamento.com.br` ❌ (sem HTTPS)  
**Domínio Desejado**: `https://icestar.icevanisolamento.com.br` ✅ (com HTTPS)

---

## 🔧 Variáveis de Ambiente Necessárias

### 1. Banco de Dados MySQL

```env
DATABASE_HOST=t12vikwinjbdh1pfr7uq6ld6
DATABASE_PORT=3306
DATABASE_NAME=default
DATABASE_USER=mysql
DATABASE_PASSWORD=sJYKzs82oECPEBq6xbVawhnzCxsKmH5DSeS5a5nNfJDqB0jLWeQMdi4rSUlobFcr
DATABASE_URL=mysql://mysql:sJYKzs82oECPEBq6xbVawhnzCxsKmH5DSeS5a5nNfJDqB0jLWeQMdi4rSUlobFcr@t12vikwinjbdh1pfr7uq6ld6:3306/default
```

### 2. NextAuth.js

```env
NEXTAUTH_SECRET=dSfc0mzg7PVzSIJYL8e3cEnK288Qc4Jgi0wOBaBi6lc=
NEXTAUTH_URL=https://icestar.icevanisolamento.com.br
AUTH_TRUST_HOST=https://icestar.icevanisolamento.com.br
```

---

## ✅ Tarefas a Fazer

### 1. Atualizar Domínio para HTTPS
- Mudar de `http://` para `https://`
- Coolify vai gerar certificado SSL automaticamente via Let's Encrypt

### 2. Adicionar Variáveis de Ambiente
- Adicionar todas as variáveis acima no painel do Coolify
- Marcar como "Runtime" (não "Buildtime")

### 3. Fazer Deploy
- Após configurar tudo, fazer um novo deploy
- Aguardar o build e deploy completarem

### 4. Testar
- Acessar https://icestar.icevanisolamento.com.br
- Verificar se o site carrega
- Testar login no admin
- Verificar se os dados do banco estão aparecendo

---

## 🌐 Configuração do Cloudflare

Você mencionou que já configurou o Cloudflare. Certifique-se de que:

✅ **DNS configurado**:
- Tipo: `A` ou `CNAME`
- Nome: `icestar`
- Valor: IP do servidor (`192.168.100.218`) ou hostname
- Proxy: Pode estar ativado (nuvem laranja) ou desativado (nuvem cinza)

✅ **SSL/TLS Mode**:
- Recomendado: **Full** ou **Full (strict)**
- Não use "Flexible" pois pode causar loops de redirecionamento

---

## 🔄 Próximos Passos

Vou fazer agora:
1. ✅ Atualizar domínio para HTTPS
2. ✅ Adicionar variáveis de ambiente
3. ✅ Fazer deploy da aplicação
4. ⏳ Aguardar você testar

---

## ⚠️ Observações Importantes

- O certificado SSL pode levar alguns minutos para ser gerado
- Se o Cloudflare estiver com proxy ativado, pode demorar um pouco mais
- Após o deploy, aguarde 2-3 minutos antes de testar
