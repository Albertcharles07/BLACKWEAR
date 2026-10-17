# Integração — front e administração

## Estado desta entrega

Nenhum backend foi criado ou conectado. A antiga lista fixa foi removida. O catálogo começa vazio; somente produtos digitados e salvos pela interface são exibidos.

O arquivo `src/data/products.js` permanece com array vazio para que o upload pelo site do GitHub também substitua o arquivo antigo, sem deixar a lista fictícia no repositório. Não é a fonte de dados das telas.

## Cadastro de produtos

`src/services/productService.js` é o ponto para conectar a API da equipe:

- `list()` retorna Promise de uma lista de produtos.
- `create(form)` recebe os campos de formulário, valida e retorna Promise do produto criado.

Nesta entrega, os dois métodos usam AsyncStorage. O cadastro permanece no mesmo navegador/aparelho, mas NÃO é compartilhado entre computadores, celulares ou membros do grupo. Para dados reais e compartilhados, substituir a implementação pela API. Não há requisição de cadastro para um servidor nesta versão.

`src/utils/productForm.js` oferece `toProductPayload(form)`, que converte os preços digitados e entrega:

```javascript
{
  name, description,
  price,          // número em reais, não centavos
  salePrice,      // opcional; número maior que zero e menor que price
  category, modality, team,
  sizes,          // array de strings
  imageUrl        // URL opcional
}
```

A API precisa devolver também um `id` estável. Normalize o id para string no adaptador, pois o catálogo local usa strings. O formato comum é o mesmo para Home, Produtos, Ofertas, Detalhe e Carrinho. `src/context/ProductsContext.js` distribui a lista, estado de carregamento/erro, recarregamento e criação às telas.

A validação é de interface: o backend também deve validar preço, desconto, imagem, tamanhos e demais campos. A criação só mostra sucesso após o armazenamento local concluir. Quando a API for conectada, mantenha essa regra de aguardar a confirmação do servidor.

## Acesso ao painel

Conforme o pedido de front, o link Gerenciar produtos aparece em Minha conta depois de entrar. Visitantes não veem o link; as rotas também conferem se há usuário logado.

O login existente continua sendo uma demonstração local. Não existe papel de admin autenticado por servidor neste código. Nesta versão de front, todo usuário que entra pelo login demonstrativo pode acessar o painel. A equipe deve substituir isso pelo papel/permissão retornado pela API, esconder o botão para quem não tiver permissão e, principalmente, restringir o endpoint no backend. Esconder um botão não é autorização real.

## Conta e carrinho

O adaptador de conta continua em `src/services/accountService.js`, com register, login e updateProfile. Os métodos retornam Promise de `{ user: { id, name, email, phone } }` e lançam Error em falha. A API de vocês pode retornar também o papel/permissões para o painel. Não devolver senha no objeto de usuário.

As contas continuam temporárias em memória. O carrinho usa uma nova chave local, `blackwearCartV2`, para que os itens fictícios das versões anteriores não reapareçam. O servidor deve recalcular estoque, preço, descontos e total no checkout. A finalização permanece demonstrativa.
