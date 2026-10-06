import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);
const normalizeEmail = value => value.trim().toLowerCase();
export function validateCredentials(email, password, confirmation) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))) return 'Digite um e-mail válido.';
  if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
  if (confirmation !== undefined && password !== confirmation) return 'As senhas não coincidem.';
  return '';
}
// Demonstração acadêmica em memória. Não persistir senhas em AsyncStorage.
export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  function register(email, password, confirmation) {
    const error = validateCredentials(email, password, confirmation);
    if (error) return error;
    const normalized = normalizeEmail(email);
    if (accounts.some(account => account.email === normalized)) return 'Este e-mail já possui uma conta.';
    setAccounts(current => [...current, { email: normalized, password }]);
    setUser({ email: normalized });
    return '';
  }
  function login(email, password) {
    const error = validateCredentials(email, password);
    if (error) return error;
    const account = accounts.find(entry => entry.email === normalizeEmail(email) && entry.password === password);
    if (!account) return 'E-mail ou senha incorretos. Se ainda não tem conta, crie uma abaixo.';
    setUser({ email: account.email });
    return '';
  }
  return <AuthContext.Provider value={{ user, register, login, logout: () => setUser(null) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider.');
  return context;
}
