import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createBook } from '../../services/books-service';
import type { NavItem } from '../books-dashboard/types';
import type { BookFormFields } from '../edit-book/types';
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
  FormCard,
  StyledForm,
  FieldGroup,
  FieldLabel,
  FieldInput,
  FormActions,
  SaveButton,
  CancelButton,
  ErrorMessage,
} from '../edit-book/styles';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard/librarian' },
  { label: 'Books', path: '/dashboard/librarian/books', active: true },
  { label: 'Reservations', path: '/dashboard/librarian/reservations' },
];

const EMPTY_FORM: BookFormFields = {
  title: '',
  author: '',
  genre: '',
  isbn: '',
  totalCopies: '',
};

export const CreateBook = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState<BookFormFields>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await createBook({
        title: fields.title,
        author: fields.author,
        genre: fields.genre,
        isbn: fields.isbn,
        totalCopies: Number(fields.totalCopies),
      });
      navigate('/dashboard/librarian/books');
    } catch {
      setError('Failed to create book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/librarian/books');
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
            <PageTitle>New Book</PageTitle>

            <FormCard>
              <StyledForm onSubmit={handleSubmit} aria-label="Create book form">
                <FieldGroup>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <FieldInput
                    id="title"
                    name="title"
                    value={fields.title}
                    onChange={handleChange}
                    placeholder="Book title"
                    aria-label="Title"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="author">Author</FieldLabel>
                  <FieldInput
                    id="author"
                    name="author"
                    value={fields.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    aria-label="Author"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="genre">Genre</FieldLabel>
                  <FieldInput
                    id="genre"
                    name="genre"
                    value={fields.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    aria-label="Genre"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="isbn">ISBN</FieldLabel>
                  <FieldInput
                    id="isbn"
                    name="isbn"
                    value={fields.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                    aria-label="ISBN"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="totalCopies">Total Copies</FieldLabel>
                  <FieldInput
                    id="totalCopies"
                    name="totalCopies"
                    type="number"
                    min="0"
                    value={fields.totalCopies}
                    onChange={handleChange}
                    placeholder="0"
                    aria-label="Total copies"
                  />
                </FieldGroup>

                {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

                <FormActions>
                  <SaveButton type="submit" disabled={isLoading} aria-label="Create book">
                    {isLoading ? 'Creating...' : 'Create'}
                  </SaveButton>
                  <CancelButton type="button" onClick={handleCancel} aria-label="Cancel">
                    Cancel
                  </CancelButton>
                </FormActions>
              </StyledForm>
            </FormCard>
          </MainContent>
        </ContentWrapper>
      </BodyLayout>
    </PageLayout>
  );
};
