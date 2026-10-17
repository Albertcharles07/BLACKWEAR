import React, { createContext, useContext, useState } from 'react';
import { accountService } from '../services/accountService';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);
 async function run(action) {
  try { const result = await action(); setUser(result.user); return ''; }
  catch (error) { return error.message || 'Não foi possível concluir. Tente novamente.'; }
 }
 const register = values => run(() => accountService.register(values));
 const login = values => run(() => accountService.login(values));
 const updateProfile = values => user ? run(() => accountService.updateProfile(user.id, values)) : Promise.resolve('Entre na sua conta novamente.');
 return <AuthContext.Provider value={{ user, register, login, updateProfile, logout: () => setUser(null) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
 const context = useContext(AuthContext);
 if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider.');
 return context;
}
