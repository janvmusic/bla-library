export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'librarian' | 'member';
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
