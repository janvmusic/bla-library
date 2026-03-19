import styled from 'styled-components';

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #eeeeee;
`;

export const StatCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inputText};
`;

export const StatIconWrapper = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ $color }) => `${$color}1a`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StatCount = styled.span<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ $color }) => $color};
  line-height: 1;
`;

export const StatDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;
