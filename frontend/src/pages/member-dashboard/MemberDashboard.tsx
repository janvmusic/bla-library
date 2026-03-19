import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useMemberStats } from '../../hooks/useMemberStats';
import type { StatCard as StatCardType } from './types';
import {
  PageLayout,
  TopBar,
  BodyLayout,
  Sidebar,
  SidebarHeader,
  NavList,
  NavItem as NavItemStyled,
  LogoutButton,
  ContentWrapper,
  ContentTopBar,
  MainContent,
  PageTitle,
} from '../librarian-dashboard/styles';
import {
  StatsGrid,
  StatCard,
  StatCardHeader,
  StatLabel,
  StatIconWrapper,
  StatCount,
  StatDescription,
} from './styles';

const BorrowedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

const OverdueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/member', active: true },
  { label: 'Books', path: '/dashboard/member/books' },
  { label: 'Reservations', path: '/dashboard/member/reservations' },
];

export const MemberDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const stats = useMemberStats();

  const STAT_CARDS: StatCardType[] = [
    {
      label: 'Books Reserved',
      description: 'currently borrowed',
      count: stats.booksReserved,
      color: theme.colors.dashboard.statBlue,
      icon: <BorrowedIcon />,
    },
    {
      label: 'Books Overdue',
      description: 'past due date',
      count: stats.booksOverdue,
      color: theme.colors.dashboard.statRed,
      icon: <OverdueIcon />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <PageLayout>
      <TopBar>Library Management System</TopBar>

      <BodyLayout>
        <Sidebar>
          <SidebarHeader>BLA Library</SidebarHeader>

          <NavList aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavItemStyled
                key={item.path}
                $active={item.active}
                onClick={() => handleNavClick(item.path)}
                tabIndex={0}
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick(item.path)}
              >
                {item.label}
              </NavItemStyled>
            ))}
          </NavList>

          <LogoutButton onClick={handleLogout} aria-label="Logout">
            Logout
          </LogoutButton>
        </Sidebar>

        <ContentWrapper>
          <ContentTopBar>Welcome, {user?.firstName ?? 'user'}</ContentTopBar>

          <MainContent>
            <PageTitle>Dashboard</PageTitle>

            <StatsGrid>
              {STAT_CARDS.map((card) => (
                <StatCard key={card.label} aria-label={`${card.label}: ${card.count}`}>
                  <StatCardHeader>
                    <StatLabel>{card.label}</StatLabel>
                    <StatIconWrapper $color={card.color}>{card.icon}</StatIconWrapper>
                  </StatCardHeader>
                  <StatCount $color={card.color}>{card.count}</StatCount>
                  <StatDescription>{card.description}</StatDescription>
                </StatCard>
              ))}
            </StatsGrid>
          </MainContent>
        </ContentWrapper>
      </BodyLayout>
    </PageLayout>
  );
};
