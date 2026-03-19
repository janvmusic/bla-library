import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useLibrarianStats } from '../../hooks/useLibrarianStats';
import type { StatCard as StatCardType, NavItem } from './types';
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
  StatsGrid,
  StatCard,
  StatCardHeader,
  StatLabel,
  StatIconWrapper,
  StatCount,
  StatDescription,
} from './styles';

const MembersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const BooksIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

const BorrowedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
  </svg>
);

const OverdueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

// TODO improve navigation
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/librarian', active: true },
  { label: 'Books', path: '/dashboard/librarian/books' },
  { label: 'Reservations', path: '/dashboard/librarian/reservations' },
];

export const LibrarianDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const stats = useLibrarianStats();

  const STAT_CARDS: StatCardType[] = [
    {
      label: 'Total Members',
      description: 'registered members',
      count: stats.totalMembers,
      color: theme.colors.dashboard.statPurple,
      icon: <MembersIcon />,
    },
    {
      label: 'Total Books',
      description: 'books in library',
      count: stats.totalBooks,
      color: theme.colors.dashboard.statBlue,
      icon: <BooksIcon />,
    },
    {
      label: 'Books Borrowed',
      description: 'currently borrowed',
      count: stats.totalBooksBorrowed,
      color: theme.colors.dashboard.statGreen,
      icon: <BorrowedIcon />,
    },
    {
      label: 'Books Overdue',
      description: 'past due date',
      count: stats.totalBooksOverdue,
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
