export const blankProductForm = { name: '', description: '', price: '', salePrice: '', category: '', modality: '', team: '', sizes: [], imageUrl: '' };
export function parseAmount(value) {
 const text = String(value ?? '').trim();
 return /^\d+(?:[.,]\d{1,2})?$/.test(text) ? Number(text.replace(',', '.')) : NaN;
}
export function validateProductForm(form) {
 const price = parseAmount(form.price);
 const salePrice = form.salePrice.trim() ? parseAmount(form.salePrice) : null;
 if (form.name.trim().length < 3) return 'Digite um nome com pelo menos 3 caracteres.';
 if (!Number.isFinite(price) || price <= 0) return 'Digite um preço válido, como 129,90, sem separador de milhar.';
 if (salePrice !== null && (!Number.isFinite(salePrice) || salePrice <= 0 || salePrice >= price)) return 'O preço promocional deve ser maior que zero e menor que o preço normal.';
 if (!form.category.trim()) return 'Informe a categoria do produto.';
 if (!form.modality.trim()) return 'Escolha uma modalidade.';
 if (!Array.isArray(form.sizes) || !form.sizes.length) return 'Selecione pelo menos um tamanho.';
 if (form.imageUrl.trim() && !/^https?:\/\/[^\s]+$/i.test(form.imageUrl.trim())) return 'Informe uma URL de imagem começando com http:// ou https://.';
 return '';
}
export function toProductPayload(form) {
 const error = validateProductForm(form);
 if (error) throw new Error(error);
 return {
  name: form.name.trim(), description: form.description.trim(), price: parseAmount(form.price),
  ...(form.salePrice.trim() ? { salePrice: parseAmount(form.salePrice) } : {}),
  category: form.category.trim(), modality: form.modality.trim(), team: form.team.trim() || 'Sem time',
  sizes: [...form.sizes], imageUrl: form.imageUrl.trim(),
 };
}
export function isValidProduct(item) {
 return item && typeof item.id === 'string' && typeof item.name === 'string' && item.name.trim().length >= 3
  && Number.isFinite(item.price) && item.price > 0 && typeof item.category === 'string' && !!item.category.trim()
  && typeof item.modality === 'string' && !!item.modality.trim() && typeof item.team === 'string'
  && Array.isArray(item.sizes) && item.sizes.length > 0 && item.sizes.every(size => typeof size === 'string')
  && (item.salePrice === undefined || Number.isFinite(item.salePrice) && item.salePrice > 0 && item.salePrice < item.price);
}
