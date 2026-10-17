globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const React = require('react');
const { fireEvent, render, waitFor } = require('@testing-library/react-native');
const AsyncStorageModule = require('@react-native-async-storage/async-storage');
const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
const { CartProvider } = require('../../context/CartContext');
const HomeScreen = require('../../screens/HomeScreen').default;

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const navigation = { navigate: jest.fn() };

async function renderHome() {
  const screen = render(
    <CartProvider>
      <HomeScreen navigation={navigation} />
    </CartProvider>
  );

  await waitFor(() => {
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('blackwearCart', '[]');
  });

  return screen;
}

describe('busca no catálogo da Home', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
    navigation.navigate.mockClear();
  });

  it('ignora maiusculas e espacos nas extremidades da busca', async () => {
    const screen = await renderHome();

    fireEvent.changeText(
      screen.getByPlaceholderText('Encontre seu melhor estilo esportivo!'),
      '  CAMISETA  '
    );

    expect(screen.getByText('Camiseta Oversized Premium')).toBeTruthy();
    expect(screen.getByText('Camiseta Street Preta')).toBeTruthy();
    expect(screen.getByText('Camiseta Basic Black')).toBeTruthy();
    expect(screen.queryByText('Moletom BLACKWEAR')).toBeNull();
  });

  it('informa quando a pesquisa nao encontra produtos', async () => {
    const screen = await renderHome();

    fireEvent.changeText(
      screen.getByPlaceholderText('Encontre seu melhor estilo esportivo!'),
      'produto inexistente'
    );

    expect(screen.getByText('Nenhum produto encontrado.')).toBeTruthy();
  });
});
