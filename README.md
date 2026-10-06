# BLACKWEAR — PI em React Native / Expo

Projeto revisado a partir do ZIP original. Continua sendo React Native, com suporte à versão web para apresentação e conferência.

## Abrir no VS Code

1. Extraia o ZIP e abra a pasta `BLACKWEAR-main` no VS Code.
2. Abra Terminal → Novo Terminal dentro da pasta que contém `package.json`.
3. Execute:

```bash
npm ci
npx expo start
```

No celular, use um Expo Go compatível com o SDK 57 do projeto. Se seu Expo Go não aceitar esse SDK, use uma development build compatível; não troque versões isoladas das dependências.

Para apresentar no navegador:

```bash
npm run web
```

## Alterações

- Área segura no topo e na base, evitando conteúdo sobre a barra de status e a navegação do celular.
- Cabeçalho compartilhado: logo, conta e carrinho na primeira linha; busca em uma segunda linha na Home.
- Produtos em duas colunas, com espaçamento que não força quebra para uma coluna.
- Banner proporcional, tipografia e margens próximas da imagem de referência.
- Telas limitadas a 600px e centralizadas em telas maiores.
- Cada produto abre seu próprio nome e preço; adicionar ao carrinho preserva o item escolhido.
- Login com e-mail e senha; cadastro com e-mail, senha e confirmação.
- Validação de e-mail, senha mínima de 6 caracteres, confirmação e conta duplicada.
- Área de conta com identificação e botão para sair.
- Finalização demonstrativa gera um número novo, limpa o carrinho e substitui a tela de carrinho por sucesso.
- Tela de sucesso rolável para celulares menores.
- Carrinho aguarda a leitura inicial do armazenamento e descarta entradas locais inválidas.

## Testar login e cadastro

1. Toque em **Conta** e depois **CRIAR CONTA**.
2. Digite um e-mail válido, senha de pelo menos 6 caracteres e a mesma senha na confirmação.
3. Após criar, você entra automaticamente.
4. Toque em **SAIR DA CONTA** e entre novamente com os mesmos dados.

Este é um fluxo acadêmico demonstrativo. Contas e senhas ficam somente na memória da sessão: fechar/recarregar o app apaga as contas. Não existe servidor, recuperação de senha, pagamento real ou envio de e-mail. O carrinho mantém a persistência em AsyncStorage.

## Estrutura

- `App.js`: navegação, área segura e providers.
- `src/components/Header.js`: cabeçalho compartilhado.
- `src/components/AuthForm.js`: formulário compartilhado de login/cadastro.
- `src/context/AuthContext.js`: acesso demonstrativo em memória.
- `src/context/CartContext.js`: carrinho e persistência.
- `src/screens/`: Home, Conta, Cadastro, Produto, Carrinho e Sucesso.
- `src/data/products.js`: catálogo demonstrativo.

As imagens dos produtos continuam como placeholders BLACKWEAR. O banner original foi incluído em `assets/banner.jpg`, para funcionar também sem internet. Fonte original: https://images.unsplash.com/photo-1461896836934-ffe607ba8211
