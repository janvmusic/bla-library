import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReservations } from '../../hooks/useReservations';
import { returnReservation } from '../../services/reservations-service';
import type { Reservation } from '../../types/reservation';
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
  ReturnButton,
} from './styles';

type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/librarian' },
  { label: 'Books', path: '/dashboard/librarian/books' },
  { label: 'Reservations', path: '/dashboard/librarian/reservations', active: true },
];

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const isOverdue = (dueDate: string): boolean => new Date(dueDate) < new Date();

export const ReservationsDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fetched = useReservations();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [returningId, setReturningId] = useState<number | null>(null);

  useEffect(() => {
    setReservations(fetched);
  }, [fetched]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleReturn = async (id: number) => {
    setReturningId(id);
    try {
      await returnReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      // retain row on failure
    } finally {
      setReturningId(null);
    }
  };

  const resolveStatus = (reservation: Reservation) => {
    if (reservation.returnedAt) return <ReturnedBadge>Returned</ReturnedBadge>;
    if (isOverdue(reservation.dueDate)) return <OverdueBadge>Overdue</OverdueBadge>;
    return <ActiveBadge>Active</ActiveBadge>;
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
            <PageTitle>Reservations</PageTitle>

            <Table aria-label="Reservations table">
              <TableHead>
                <TableHeadRow>
                  <TableHeadCell>Book</TableHeadCell>
                  <TableHeadCell>Reserved By</TableHeadCell>
                  <TableHeadCell>Reservation Date</TableHeadCell>
                  <TableHeadCell>Due Date</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableHeadRow>
              </TableHead>

              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.bookTitle}</TableCell>
                    <TableCell>
                      {reservation.userFirstName} {reservation.userLastName}
                    </TableCell>
                    <TableCell>{formatDate(reservation.borrowDate)}</TableCell>
                    <TableCell>{formatDate(reservation.dueDate)}</TableCell>
                    <TableCell>{resolveStatus(reservation)}</TableCell>
                    <TableCell>
                      {!reservation.returnedAt && (
                        <ReturnButton
                          onClick={() => handleReturn(reservation.id)}
                          disabled={returningId === reservation.id}
                          aria-label={`Mark ${reservation.bookTitle} as returned`}
                        >
                          {returningId === reservation.id ? 'Returning...' : 'Mark Returned'}
                        </ReturnButton>
                      )}
                    </TableCell>
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
