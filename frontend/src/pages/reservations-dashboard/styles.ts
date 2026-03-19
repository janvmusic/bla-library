import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #eeeeee;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.dashboard.sidebarBg};
`;

export const TableHeadRow = styled.tr``;

export const TableHeadCell = styled.th`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.buttonText};
  letter-spacing: 0.4px;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-top: 1px solid #eeeeee;

  &:hover {
    background-color: #f9f9fb;
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.inputText};
`;

export const OverdueBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statRed}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statRed};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const ActiveBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statGreen}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statGreen};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const ReturnedBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => `${theme.colors.muted}1a`};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const ReturnButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.dashboard.statGreen};
  color: ${({ theme }) => theme.colors.dashboard.statGreen};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => `${theme.colors.dashboard.statGreen}1a`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
