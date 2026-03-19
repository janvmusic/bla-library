import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  Card,
  CardTitle,
  WaveContainer,
  FormWrapper,
  InputGroup,
  InputIcon,
  StyledInput,
  PasswordToggle,
  LoginButton,
  ErrorMessage,
} from './styles';
import { useAuth } from '../../hooks/useAuth';

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

const CardWave = () => (
  <WaveContainer aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 420 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8c8f0" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#c8d8f8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#dce8ff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M0,65 C60,15 120,110 210,65 C300,20 360,115 420,65 L420,260 L0,260 Z" fill="url(#waveGrad)" />
    </svg>
  </WaveContainer>
);

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ email, password });
      const role = user?.role;
      navigate(role === 'librarian' ? '/dashboard/librarian' : '/dashboard/member');
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <PageWrapper>
      <Card role="main">
        <CardTitle>Log in</CardTitle>
        <CardWave />
        <FormWrapper onSubmit={handleSubmit} noValidate>
          <InputGroup>
            <InputIcon>
              <UserIcon />
            </InputIcon>
            <StyledInput
              id="email"
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              autoComplete="email"
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <LockIcon />
            </InputIcon>
            <StyledInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              autoComplete="current-password"
              required
            />
            <PasswordToggle
              type="button"
              onClick={handleTogglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </PasswordToggle>
          </InputGroup>

          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

          <LoginButton type="submit" disabled={isLoading} aria-label="Log in">
            {isLoading ? 'Logging in...' : 'Log in'}
          </LoginButton>
        </FormWrapper>
      </Card>
    </PageWrapper>
  );
};
