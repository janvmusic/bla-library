import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';
import { filterBooks } from '../../utils/book-search';
import type { NavItem } from './types';
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
  PageTitleRow,
  CreateButton,
  SearchWrapper,
  SearchInput,
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
  EditIconButton,
  DeleteIconButton,
} from './styles';

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

// TODO: Improve navigation
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/librarian' },
  { label: 'Books', path: '/dashboard/librarian/books', active: true },
  { label: 'Reservations', path: '/dashboard/librarian/reservations' },
];

export const BooksDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const books = useBooks();
  const [searchQuery, setSearchQuery] = useState('');

  const visibleBooks = filterBooks(books, searchQuery);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleEditBook = (id: number) => {
    navigate(`/books/${id}/edit`);
  };

  const handleDeleteBook = (id: number) => {
    navigate(`/books/${id}/delete`);
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
            <PageTitleRow>
              <PageTitle>Books</PageTitle>
            </PageTitleRow>

            <SearchWrapper>
              <SearchInput
                type="search"
                placeholder="Search by title, author, genre or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books"
              />

              <CreateButton onClick={() => navigate('/books/new')} aria-label="Create new book">
                + New Book
              </CreateButton>
            </SearchWrapper>

            <BooksGrid>
              {visibleBooks.map((book) => (
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
                    <BookMetaRow>
                      <BookMetaLabel>ISBN: </BookMetaLabel>
                      {book.isbn}
                    </BookMetaRow>
                  </BookMeta>

                  <BookCardFooter>
                    <BookCopies>{book.totalCopies} copies</BookCopies>
                    <CardActions>
                      <EditIconButton
                        onClick={() => handleEditBook(book.id)}
                        aria-label={`Edit ${book.title}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditBook(book.id)}
                      >
                        <EditIcon />
                      </EditIconButton>
                      <DeleteIconButton
                        onClick={() => handleDeleteBook(book.id)}
                        aria-label={`Delete ${book.title}`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleDeleteBook(book.id)}
                      >
                        <DeleteIcon />
                      </DeleteIconButton>
                    </CardActions>
                  </BookCardFooter>
                </BookCard>
              ))}
            </BooksGrid>
          </MainContent>
        </ContentWrapper>
      </BodyLayout>
    </PageLayout>
  );
};
