globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const React = require('react');
const { act, renderHook, waitFor } = require('@testing-library/react-native');
const AsyncStorageModule = require('@react-native-async-storage/async-storage');
const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
const { CartProvider, useCart } = require('../CartContext');

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const product = { name: 'Camiseta', price: 100 };

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

async function renderCart() {
  const hook = renderHook(() => useCart(), { wrapper });

  await waitFor(() => {
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('blackwearCart', '[]');
  });

  return hook;
}

describe('regras do carrinho', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('agrupa o mesmo produto e tamanho, mas mantem tamanhos diferentes', async () => {
    const { result } = await renderCart();

    act(() => {
      result.current.addProduct(product, 'M');
      result.current.addProduct(product, 'M');
      result.current.addProduct(product, 'G');
    });

    expect(result.current.cart).toEqual([
      { name: 'Camiseta', price: 100, size: 'M', quantity: 2 },
      { name: 'Camiseta', price: 100, size: 'G', quantity: 1 },
    ]);
    expect(result.current.totalQuantity).toBe(3);
    expect(result.current.total).toBe(300);
  });

  it('atualiza quantidade, total e remove o item ao diminuir abaixo de um', async () => {
    const { result } = await renderCart();

    act(() => {
      result.current.addProduct(product, 'M');
      result.current.increase(0);
    });

    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.total).toBe(200);

    act(() => {
      result.current.decrease(0);
    });
    expect(result.current.cart[0].quantity).toBe(1);

    act(() => {
      result.current.decrease(0);
    });
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('rehidrata itens persistidos', async () => {
    const savedCart = [
      { name: 'Camiseta', price: 100, size: 'M', quantity: 2 },
    ];
    await AsyncStorage.setItem('blackwearCart', JSON.stringify(savedCart));
    jest.clearAllMocks();

    const { result } = await renderCart();

    expect(result.current.cart).toEqual(savedCart);
    expect(result.current.total).toBe(200);
  });
});
