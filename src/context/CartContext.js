import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useProducts } from './ProductsContext';
import { getPrice } from '../utils/catalog';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext(null);
const CART_KEY = 'blackwearCartV2';

export function CartProvider({ children }) {
  const { products, loading: productsLoading } = useProducts();
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const saved = await AsyncStorage.getItem(CART_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        setCart(Array.isArray(parsed) ? parsed.filter(item => item && typeof item.name === 'string' && Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0 && typeof item.size === 'string').map(item => {
          const product = products.find(p => item.id ? p.id === item.id : p.name === item.name);
          return product ? { ...item, id: product.id, price: getPrice(product) } : null;
        }).filter(Boolean) : []);
      } catch {
        setCart([]);
      } finally {
        setLoaded(true);
      }
    }

    if (!productsLoading) loadCart();
  }, [productsLoading]);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart)).catch(() => {});
  }, [cart, loaded]);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0) / 100,
    [cart]
  );

  function addProduct(product, size) {
    setCart((current) => {
      const existing = current.find(
        (item) => (item.id ? item.id === product.id : item.name === product.name) && item.size === size
      );

      if (existing) {
        return current.map((item) =>
          (item.id ? item.id === product.id : item.name === product.name) && item.size === size
            ? { ...item, id: product.id, price: getPrice(product), quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: getPrice(product),
          size,
          quantity: 1,
        },
      ];
    });
  }

  function increase(index) {
    setCart((current) =>
      current.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(index) {
    setCart((current) => {
      const item = current[index];
      if (!item) return current;

      if (item.quantity > 1) {
        return current.map((entry, i) =>
          i === index ? { ...entry, quantity: entry.quantity - 1 } : entry
        );
      }

      return current.filter((_, i) => i !== index);
    });
  }

  function remove(index) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  if (!loaded) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator color="#111" accessibilityLabel="Carregando carrinho" /></View>;

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        total,
        addProduct,
        increase,
        decrease,
        remove,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart precisa ser usado dentro de CartProvider.');
  }

  return context;
}
