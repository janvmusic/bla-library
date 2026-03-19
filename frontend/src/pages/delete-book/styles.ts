import styled from 'styled-components';

export const ConfirmCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #eeeeee;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ConfirmMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.inputText};
  margin: 0;
`;

export const BookName = styled.span`
  font-weight: 700;
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;

export const DeleteButton = styled.button`
  background: ${({ theme }) => theme.colors.dashboard.statRed};
  color: #ffffff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #c62828;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid #cccccc;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f4f5f7;
  }
`;
