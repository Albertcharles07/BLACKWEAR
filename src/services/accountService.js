// Adaptador DEMO do front. Não faz requisições nem persiste senhas.
// A equipe de backend pode substituir estes métodos por chamadas à API,
// mantendo o retorno { user } e lançando Error com uma mensagem para a tela.
let accounts = [];
let nextId = 1;
export const normalizeEmail = value => String(value || '').trim().toLowerCase();
export function validateProfile({ name, email, phone = '' }) {
 if (!name.trim() || name.trim().length < 2) return 'Digite seu nome com pelo menos 2 caracteres.';
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))) return 'Digite um e-mail válido.';
 const digits = phone.replace(/\D/g, '');
 if (phone.trim() && (digits.length < 10 || digits.length > 11)) return 'Digite um telefone com DDD e 10 ou 11 dígitos.';
 return '';
}
export function validateCredentials(email, password, confirmation) {
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))) return 'Digite um e-mail válido.';
 if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
 if (confirmation !== undefined && password !== confirmation) return 'As senhas não coincidem.';
 return '';
}
const publicUser = ({ id, name, email, phone }) => ({ id, name, email, phone });
export const accountService = {
 async register({ name, email, phone = '', password, confirmation }) {
  const error = validateProfile({ name, email, phone }) || validateCredentials(email, password, confirmation);
  if (error) throw new Error(error);
  const normalized = normalizeEmail(email);
  if (accounts.some(account => account.email === normalized)) throw new Error('Este e-mail já possui uma conta.');
  const account = { id: nextId++, name: name.trim(), email: normalized, phone: phone.trim(), password };
  accounts = [...accounts, account];
  return { user: publicUser(account) };
 },
 async login({ email, password }) {
  const error = validateCredentials(email, password);
  if (error) throw new Error(error);
  const account = accounts.find(entry => entry.email === normalizeEmail(email) && entry.password === password);
  if (!account) throw new Error('E-mail ou senha incorretos. Se ainda não tem conta, crie uma abaixo.');
  return { user: publicUser(account) };
 },
 async updateProfile(id, profile) {
  const error = validateProfile(profile);
  if (error) throw new Error(error);
  const index = accounts.findIndex(account => account.id === id);
  if (index < 0) throw new Error('Entre na sua conta novamente.');
  const email = normalizeEmail(profile.email);
  if (accounts.some(account => account.id !== id && account.email === email)) throw new Error('Este e-mail já está em uso por outra conta.');
  const account = { ...accounts[index], name: profile.name.trim(), email, phone: (profile.phone || '').trim() };
  accounts = accounts.map(entry => entry.id === id ? account : entry);
  return { user: publicUser(account) };
 },
};
