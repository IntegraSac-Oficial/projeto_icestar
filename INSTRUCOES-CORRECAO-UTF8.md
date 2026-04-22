# Instruções para Corrigir Problema de Encoding UTF-8

## ✅ Correções Aplicadas

1. **Conexão MySQL com charset UTF-8** ✅
   - Adicionado `charset: 'utf8mb4'` na configuração do pool
   - Adicionado `SET NAMES utf8mb4` em cada operação de update

2. **Limpeza automática de cache** ✅
   - Cache é limpo automaticamente após salvar conteúdo
   - Garante que a landing page mostra dados atualizados

3. **Dados existentes corrigidos** ✅
   - Script executado para corrigir encoding dos dados antigos

## 🔄 PASSOS OBRIGATÓRIOS

### 1. REINICIAR O SERVIDOR (OBRIGATÓRIO!)

O servidor Next.js mantém conexões de banco em memória. Você DEVE reiniciar para aplicar as mudanças:

```bash
# Pare o servidor (Ctrl+C)
# Depois inicie novamente:
npm run dev
```

### 2. LIMPAR CACHE DO NAVEGADOR

Após reiniciar o servidor:

1. Abra o DevTools (F12)
2. Clique com botão direito no botão de reload
3. Selecione "Limpar cache e recarregar forçadamente" (Hard Reload)

OU simplesmente:

- **Chrome/Edge**: Ctrl + Shift + Delete → Limpar cache
- **Firefox**: Ctrl + Shift + Delete → Limpar cache

### 3. TESTAR O SALVAMENTO

1. Acesse: http://localhost:3000/admin/content/hero
2. Edite algum campo com acentos (ex: "Soluções", "Refrigeração")
3. Clique em "Salvar Alterações"
4. Aguarde a mensagem de sucesso
5. Acesse a landing page: http://localhost:3000
6. Verifique se o texto aparece corretamente

## 🧪 Scripts de Teste Disponíveis

Se ainda houver problemas, execute estes scripts para diagnosticar:

```bash
# Testar salvamento direto no banco
npx tsx scripts/test-charset-save.ts

# Testar camada de serviço
npx tsx scripts/debug-api-save.ts

# Corrigir dados existentes novamente
npx tsx scripts/fix-content-encoding.ts
```

## ⚠️ IMPORTANTE

- **SEMPRE reinicie o servidor** após mudanças no código de conexão do banco
- **SEMPRE limpe o cache do navegador** após mudanças no conteúdo
- O cache do Next.js é de 5 minutos, mas é limpo automaticamente ao salvar

## 🔍 Como Verificar se Está Funcionando

### No Admin Panel:
- Textos com acentos devem aparecer corretamente no preview
- Ao salvar, deve mostrar "Conteúdo salvo com sucesso!"

### Na Landing Page:
- Todos os acentos devem aparecer corretamente
- Não deve haver caracteres estranhos (Ã, Â, etc.)

### No Banco de Dados:
Execute o script de teste:
```bash
npx tsx scripts/test-charset-save.ts
```

Deve mostrar: `✅ All characters saved and retrieved correctly!`

## 🆘 Se Ainda Não Funcionar

1. Verifique se o servidor foi realmente reiniciado
2. Verifique se o cache do navegador foi limpo
3. Tente em uma aba anônima do navegador
4. Execute os scripts de teste para identificar onde está o problema
5. Verifique o console do navegador (F12) para erros

## 📝 Arquivos Modificados

- `src/lib/db/connection.ts` - Adicionado charset UTF-8
- `src/lib/services/content.service.ts` - Adicionado SET NAMES e limpeza de cache
- `src/app/api/admin/cache/route.ts` - Nova API para limpar cache
- Scripts de correção e teste criados

## ✨ Resultado Esperado

Após seguir todos os passos:
- ✅ Textos salvam com acentos corretos
- ✅ Landing page mostra textos corretos
- ✅ Preview no admin mostra textos corretos
- ✅ Não há mais caracteres estranhos (Ã, Â, etc.)
