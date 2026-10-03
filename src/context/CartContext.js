import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext(null);
const CART_KEY = 'blackwearCart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const saved = await AsyncStorage.getItem(CART_KEY);
        setCart(saved ? JSON.parse(saved) : []);
      } catch {
        setCart([]);
      } finally {
        setLoaded(true);
      }
    }

    loadCart();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart)).catch(() => {});
  }, [cart, loaded]);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  function addProduct(product, size) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.name === product.name && item.size === size
      );

      if (existing) {
        return current.map((item) =>
          item.name === product.name && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          name: product.name,
          price: product.price,
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

  async function clearCart() {
    setCart([]);
    await AsyncStorage.removeItem(CART_KEY);
  }

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
