import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidProduct, toProductPayload } from '../utils/productForm';
// Front local, sem seed e sem produtos fictícios. Somente cadastros feitos pela interface.
// A equipe de backend deve substituir list/create por sua API e validar a permissão de admin.
const KEY = 'blackwearProductsV1';
let pendingWrite = Promise.resolve();
export const productService = {
 async list() {
  const saved = await AsyncStorage.getItem(KEY);
  if (!saved) return [];
  let parsed;
  try { parsed = JSON.parse(saved); } catch { throw new Error('Não foi possível ler o catálogo salvo neste aparelho.'); }
  if (!Array.isArray(parsed)) throw new Error('O catálogo salvo está em um formato inválido.');
  return parsed.filter(isValidProduct);
 },
 create(form) {
  const payload = toProductPayload(form);
  const operation = pendingWrite.then(async () => {
   const current = await productService.list();
   const product = { ...payload, id: `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}` };
   await AsyncStorage.setItem(KEY, JSON.stringify([...current, product]));
   return product;
  });
  pendingWrite = operation.catch(() => {});
  return operation;
 },
};
