import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.pageBg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  width: 420px;
  padding: ${({ theme }) => theme.spacing.xxl} 40px 40px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const CardTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

export const WaveContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 0;
  width: 100%;
  height: 62%;
  z-index: 0;
  pointer-events: none;
`;

export const FormWrapper = styled.form`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.inputBorder};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InputIcon = styled.span`
  color: ${({ theme }) => theme.colors.inputIcon};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.inputText};

  &::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }
`;

export const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.inputPlaceholder};
  display: flex;
  align-items: center;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.inputIcon};
  }
`;

export const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.buttonBg};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xs};
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #2d0070;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  margin: 0;
`;
