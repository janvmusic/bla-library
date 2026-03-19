import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';
import { createReservation } from '../../services/reservations-service';
import { Toast } from '../../components/toast/Toast';
import type { AxiosError } from 'axios';
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
  BooksGrid,
  BookCard,
  BookCardHeader,
  BookTitle,
  BookIconWrapper,
  BookMeta,
  BookMetaRow,
  BookMetaLabel,
  BookCardFooter,
  BookCopies,
  CardActions,
  ReserveIconButton,
} from '../books-dashboard/styles';

const ReserveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/member' },
  { label: 'Books', path: '/dashboard/member/books', active: true },
  { label: 'Reservations', path: '/dashboard/member/reservations' },
];

export const BookList = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const books = useBooks();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const availableBooks = books.filter((book) => book.totalCopies >= 1);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleDismissError = useCallback(() => setErrorMessage(null), []);
  const handleDismissSuccess = useCallback(() => setSuccessMessage(null), []);

  const handleReserve = (bookId: number) => {
    if (!user) {
      return;
    }
    createReservation(bookId, user.id)
      .then(() => setSuccessMessage('Book reserved successfully!'))
      .catch((err: AxiosError<{ errors: string[] }>) => {
        const message = err.response?.data?.errors?.[0] ?? 'Failed to reserve book.';
        setErrorMessage(message);
      });
  };

  return (
    <>
      {errorMessage && <Toast message={errorMessage} onDismiss={handleDismissError} />}
      {successMessage && <Toast message={successMessage} variant="success" onDismiss={handleDismissSuccess} />}
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
              <PageTitle>Books</PageTitle>

              <BooksGrid>
                {availableBooks.map((book) => (
                  <BookCard key={book.id} aria-label={`Book: ${book.title}`}>
                    <BookCardHeader>
                      <BookTitle>{book.title}</BookTitle>
                      <BookIconWrapper>
                        <BookIcon />
                      </BookIconWrapper>
                    </BookCardHeader>

                    <BookMeta>
                      <BookMetaRow>
                        <BookMetaLabel>Author: </BookMetaLabel>
                        {book.author}
                      </BookMetaRow>
                      <BookMetaRow>
                        <BookMetaLabel>Genre: </BookMetaLabel>
                        {book.genre}
                      </BookMetaRow>
                    </BookMeta>

                    <BookCardFooter>
                      <BookCopies>{book.totalCopies} copies</BookCopies>
                      <CardActions>
                        <ReserveIconButton
                          onClick={() => handleReserve(book.id)}
                          aria-label={`Reserve ${book.title}`}
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleReserve(book.id)}
                        >
                          <ReserveIcon />
                        </ReserveIconButton>
                      </CardActions>
                    </BookCardFooter>
                  </BookCard>
                ))}
              </BooksGrid>
            </MainContent>
          </ContentWrapper>
        </BodyLayout>
      </PageLayout>
    </>
  );
};
