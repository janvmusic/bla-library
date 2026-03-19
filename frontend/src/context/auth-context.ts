import { createContext } from 'react';
import type { LoginCredentials } from '../types/auth';
import type { User } from '../types/user';

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
