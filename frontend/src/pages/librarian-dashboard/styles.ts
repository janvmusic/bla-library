import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopBar = styled.header`
  background-color: ${({ theme }) => theme.colors.dashboard.headerBg};
  color: ${({ theme }) => theme.colors.buttonText};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  letter-spacing: 0.5px;
  display: none;
`;

export const BodyLayout = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.aside`
  width: 200px;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.dashboard.sidebarBg};
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dashboard.sidebarText};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing.xs};
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  display: block;
  margin: 2px ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.dashboard.sidebarActiveText : theme.colors.dashboard.sidebarText};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.dashboard.sidebarActiveItemBg : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.dashboard.sidebarActiveItemBg};
    color: ${({ theme }) => theme.colors.dashboard.sidebarActiveText};
  }
`;

export const LogoutButton = styled.button`
  margin: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.dashboard.sidebarActiveItemBg};
  color: ${({ theme }) => theme.colors.dashboard.sidebarText};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.card};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  align-self: stretch;

  &:hover {
    background-color: rgba(255, 255, 255, 0.28);
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentTopBar = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inputText};
  border-bottom: 1px solid #e0e0e0;
`;

export const MainContent = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dashboard.contentBg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.inputText};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

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
  cursor: default;
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
