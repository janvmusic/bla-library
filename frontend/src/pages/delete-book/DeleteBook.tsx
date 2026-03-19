import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBook } from '../../hooks/useBook';
import { deleteBook } from '../../services/books-service';
import type { NavItem } from '../books-dashboard/types';
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
  ConfirmCard,
  ConfirmMessage,
  BookName,
  ConfirmActions,
  ErrorMessage,
  DeleteButton,
  CancelButton,
} from './styles';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/librarian' },
  { label: 'Books', path: '/dashboard/librarian/books', active: true },
  { label: 'Reservations', path: '/dashboard/librarian/reservations' },
];

export const DeleteBook = () => {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const book = useBook(Number(id));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleCancel = () => {
    navigate('/dashboard/librarian/books');
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteBook(Number(id));
      navigate('/dashboard/librarian/books');
    } catch {
      setError('Failed to delete the book. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <PageTitle>Delete Book</PageTitle>

            <ConfirmCard>
              <ConfirmMessage>
                Are you sure you want to delete <BookName>{book?.title ?? '...'}</BookName>? This
                action cannot be undone.
              </ConfirmMessage>

              {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

              <ConfirmActions>
                <DeleteButton onClick={handleDelete} disabled={isLoading} aria-label="Confirm delete">
                  {isLoading ? 'Deleting...' : 'Delete'}
                </DeleteButton>
                <CancelButton onClick={handleCancel} aria-label="Cancel">
                  Cancel
                </CancelButton>
              </ConfirmActions>
            </ConfirmCard>
          </MainContent>
        </ContentWrapper>
      </BodyLayout>
    </PageLayout>
  );
};
