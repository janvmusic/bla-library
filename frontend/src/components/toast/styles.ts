import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ToastWrapper = styled.div<{ $variant: 'error' | 'success' }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background-color: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors.dashboard.statGreen : theme.colors.error};
  color: #ffffff;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 320px;
  animation: ${slideIn} 0.2s ease-out;
`;
