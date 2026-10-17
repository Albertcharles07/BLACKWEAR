import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const load = async path => import('data:text/javascript;base64,' + Buffer.from(await readFile(new URL('../' + path, import.meta.url))).toString('base64'));
const { filterProducts, emptyFilters, getPrice } = await load('src/utils/catalog.js');
const { accountService } = await load('src/services/accountService.js');
const { blankProductForm, parseAmount, validateProductForm, toProductPayload, isValidProduct } = await load('src/utils/productForm.js');
// Fixtures exclusivos deste teste. Nenhum destes itens é carregado pelo app.
const products = [
 { id: 'test-1', name: 'Produto São Paulo de teste', category: 'Teste', modality: 'Futebol', team: 'Time de teste', price: 129.9, salePrice: 99.9, sizes: ['M'] },
 { id: 'test-2', name: 'Outro item de teste', category: 'Teste', modality: 'Treino', team: 'Sem time', price: 159.9, sizes: ['G'] },
];
assert.equal(filterProducts([], emptyFilters).length, 0);
assert.equal(filterProducts(products, emptyFilters, 'sao paulo')[0].id, 'test-1');
assert.equal(filterProducts(products, { ...emptyFilters, modality: 'Futebol', team: 'Time de teste' }).length, 1);
assert.equal(filterProducts(products, { ...emptyFilters, modality: 'Treino', team: 'Time de teste' }).length, 0);
assert.equal(filterProducts(products, emptyFilters, '', true).length, 1);
assert.equal(filterProducts(products, { ...emptyFilters, maxPrice: '100' }).length, 1);
assert.equal(filterProducts(products, { ...emptyFilters, sort: 'Menor preço' })[0].id, 'test-1');
assert.equal(Math.round(getPrice(products[0]) * 100) * 2 / 100, 199.8);
assert.equal(getPrice({ price: 100, salePrice: 120 }), 100);
assert.equal(parseAmount('129,90'), 129.9);
assert(Number.isNaN(parseAmount('12abc')));
assert(validateProductForm(blankProductForm));
const form = { ...blankProductForm, name: 'Item cadastrado', category: 'Camisetas', modality: 'Futebol', price: '129,90', salePrice: '99,90', sizes: ['M'] };
assert.equal(validateProductForm(form), '');
assert(validateProductForm({ ...form, salePrice: '139,90' }));
assert(validateProductForm({ ...form, sizes: [] }));
assert(validateProductForm({ ...form, imageUrl: 'javascript:alert(1)' }));
const payload = toProductPayload(form);
assert.equal(payload.price, 129.9); assert.equal(payload.salePrice, 99.9); assert.equal(payload.team, 'Sem time');
assert(isValidProduct({ ...payload, id: 'local-test' }));
assert(!isValidProduct({ ...payload, id: 'bad', salePrice: 999 }));
await assert.rejects(() => accountService.register({ name: 'João', email: 'j@exemplo.com', password: '123456', confirmation: '654321' }), /não coincidem/);
const { user } = await accountService.register({ name: 'João', email: 'j@exemplo.com', password: '123456', confirmation: '123456' });
assert.equal('password' in user, false);
await accountService.register({ name: 'Alice', email: 'a@exemplo.com', password: '123456', confirmation: '123456' });
await assert.rejects(() => accountService.updateProfile(user.id, { name: 'João', email: 'A@EXEMPLO.COM' }), /já está em uso/);
await assert.rejects(() => accountService.updateProfile(user.id, { name: 'João', email: 'invalido' }), /e-mail válido/);
await assert.rejects(() => accountService.updateProfile(user.id, { name: 'João', email: 'j@exemplo.com', phone: '123' }), /telefone com DDD/);
await accountService.updateProfile(user.id, { name: 'João Atualizado', email: 'NOVO@EXEMPLO.COM', phone: '11999999999' });
await assert.rejects(() => accountService.login({ email: 'j@exemplo.com', password: '123456' }), /incorretos/);
assert.equal((await accountService.login({ email: 'novo@exemplo.com', password: '123456' })).user.name, 'João Atualizado');
console.log('OK: catálogo vazio, filtros, formulário de produto, preços e perfil. Fixtures somente nos testes.');
