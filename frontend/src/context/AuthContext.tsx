import { useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, LoginCredentials } from '../types/auth';
import api from '../services/api';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/sign_in', { user: credentials });
    const { token, user: authUser } = response.data;
    localStorage.setItem('auth_token', token);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};
