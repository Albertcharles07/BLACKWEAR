import React, { createContext, useContext, useEffect, useState } from 'react';
import { productService } from '../services/productService';
const ProductsContext = createContext(null);
export function ProductsProvider({ children }) {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 async function refreshProducts() {
  setLoading(true); setError('');
  try { setProducts(await productService.list()); }
  catch (e) { setError(e.message || 'Não foi possível carregar os produtos.'); }
  finally { setLoading(false); }
 }
 useEffect(() => { refreshProducts(); }, []);
 async function createProduct(form) {
  const created = await productService.create(form);
  setProducts(current => [...current, created]);
  return created;
 }
 return <ProductsContext.Provider value={{ products, loading, error, refreshProducts, createProduct }}>{children}</ProductsContext.Provider>;
}
export function useProducts() {
 const context = useContext(ProductsContext);
 if (!context) throw new Error('useProducts precisa estar dentro de ProductsProvider.');
 return context;
}
