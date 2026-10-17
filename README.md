# BLACKWEAR — front com administração

React Native / Expo. Esta entrega mantém catálogo, filtros, ofertas e Minha conta com formulário separado e acrescenta o painel de produtos.

## O que é mock?

Mock é um dado ou comportamento simulado usado para testar. A lista anterior de produtos, times e preços era fictícia e foi retirada. O catálogo desta entrega inicia vazio. O arquivo antigo `src/data/products.js` fica com um array vazio para substituir a lista também no upload pelo GitHub.

O painel permite cadastrar itens manualmente. Esses itens NÃO são uma lista de exemplo: são dados digitados pelo usuário e guardados somente no aparelho/navegador, em AsyncStorage. O backend está com outra equipe e ainda não foi conectado. Login, perfil e checkout mantêm o comportamento demonstrativo anterior.

## Usar o painel

1. Minha conta → entre ou crie uma conta para a sessão.
2. Toque em Gerenciar produtos.
3. Toque em Adicionar produto.
4. Preencha nome, preço, categoria, modalidade e tamanhos.
5. Descrição, time, oferta e URL de imagem são opcionais.
6. Salve. O item aparece no painel e no catálogo; se tiver oferta, também em Ofertas.

O preço aceita vírgula ou ponto decimal, sem separador de milhar. A oferta precisa ser menor que o preço normal. O tamanho Único não pode ser combinado com P/M/G/GG.

## Acesso e integração

No front atual, o link aparece para quem está logado na demonstração. Não há autenticação real de papel admin. A equipe do backend deverá controlar permissões no servidor e fornecer o papel/permissão para a interface. O cadastro local não equivale a publicar produto na loja real.

Conectar a API em `src/services/productService.js`. Os componentes já recebem a lista por `ProductsContext`; listagem e criação são centralizadas. Veja `docs/INTEGRACAO-FRONT.md`.

## Abrir no PC

O ZIP inclui `PREVIA-ABRIR.html` fora da pasta do projeto. Extraia e abra esse arquivo no navegador para testar sem instalar nada.

Para executar o código no VS Code, abra a pasta que contém package.json:

```powershell
npm.cmd ci
npm.cmd run web
```

## Expo Go

Com Node.js instalado, computador e celular na mesma rede Wi-Fi:

```powershell
npm.cmd ci
npx.cmd expo start --go --lan
```

Escaneie o QR Code pelo Expo Go no Android ou pela câmera no iPhone. O projeto mantém SDK 57 e depende de Expo Go compatível. Mantenha o terminal aberto. Se a rede impedir acesso, há a opção `--tunnel`, que pode pedir instalação de uma dependência adicional.

## Testes

```powershell
npm.cmd test
```

Os dados pequenos dentro do script de testes são fixtures exclusivos dos testes. Nunca são importados pelo app.

## Atualizar no GitHub

1. Abra a branch `joao-ui-login`.
2. Add file → Upload files.
3. Arraste o conteúdo da pasta do projeto, incluindo src, assets, docs, scripts e os arquivos da raiz.
4. Não envie node_modules, .expo, o ZIP nem PREVIA-ABRIR.html.
5. Faça commit: `Adiciona painel de produtos e remove catálogo fictício`.
6. Se o Pull Request anterior ainda estiver Open, ele recebe os novos commits automaticamente. Se estiver fechado ou mesclado, prepare um novo PR.

Compare mudanças posteriores do grupo antes de substituir os arquivos. O arquivo src/data/products.js vazio deve ser enviado também para substituir a antiga lista fixa.
