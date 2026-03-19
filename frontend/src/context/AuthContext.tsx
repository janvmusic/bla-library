import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LoginCredentials } from '../types/auth';
import type { User } from '../types/user';
import { deserializeUser } from '../services/user-deserializer';
import api from '../services/api';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post('/auth/sign_in', { user: credentials });
    const token = response.headers['authorization']?.replace('Bearer ', '') ?? '';
    localStorage.setItem('auth_token', token);

    const loggedInUser = deserializeUser(response.data);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};
