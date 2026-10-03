# BLACKWEAR — React Native

Conversão do frontend original da BLACKWEAR (HTML/CSS/JavaScript) para React Native.

## O que foi preservado

- Telas existentes: Home, Conta, Produto, Carrinho e Pedido realizado.
- Textos, produtos, preços e fluxo existentes.
- Placeholder BLACKWEAR usado no projeto original.
- Banner da Home usando a mesma URL que já existia no HTML original.
- Funcionalidades existentes do carrinho.
- Pesquisa de produtos da Home.
- Seleção de tamanho na tela de produto.
- Geração do número do pedido e limpeza do carrinho ao finalizar.

## Tecnologias

- React Native
- Expo
- React Navigation
- AsyncStorage

## Instalação

No terminal, dentro desta pasta:

```bash
npm install
npx expo start
```

Para testar no celular, instale o Expo Go e escaneie o QR Code mostrado pelo Expo.

## Estrutura

```text
src/
├── components/
├── context/
├── data/
└── screens/
```

O projeto foi separado em telas/componentes para facilitar a continuidade do grupo e a futura integração com o backend.
