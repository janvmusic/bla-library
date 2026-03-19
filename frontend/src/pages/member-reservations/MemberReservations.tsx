import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReservations } from '../../hooks/useReservations';
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
  Table,
  TableHead,
  TableHeadRow,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  OverdueBadge,
  ActiveBadge,
  ReturnedBadge,
} from '../reservations-dashboard/styles';
import type { Reservation } from '../../types/reservation';

type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/member' },
  { label: 'Books', path: '/dashboard/member/books' },
  { label: 'Reservations', path: '/dashboard/member/reservations', active: true },
];

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const isOverdue = (dueDate: string): boolean => new Date(dueDate) < new Date();

const resolveStatus = (reservation: Reservation) => {
  if (reservation.returnedAt) {
    return <ReturnedBadge>Returned</ReturnedBadge>;
  }

  if (isOverdue(reservation.dueDate)) {
    return <OverdueBadge>Overdue</OverdueBadge>;
  }

  return <ActiveBadge>Active</ActiveBadge>;
};

export const MemberReservations = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const reservations = useReservations();

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
            <PageTitle>My Reservations</PageTitle>

            <Table aria-label="My reservations table">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>Book</TableHeadCell>
                  <TableHeadCell>Reservation Date</TableHeadCell>
                  <TableHeadCell>Due Date</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </TableHeadRow>
              </TableHead>

              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.bookTitle}</TableCell>
                    <TableCell>{formatDate(reservation.borrowDate)}</TableCell>
                    <TableCell>{formatDate(reservation.dueDate)}</TableCell>
                    <TableCell>{resolveStatus(reservation)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MainContent>
        </ContentWrapper>
      </BodyLayout>
    </PageLayout>
  );
};
