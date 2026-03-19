import styled from 'styled-components';

export const SearchWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 360px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.inputText};
  background-color: ${({ theme }) => theme.colors.cardBg};
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.inputPlaceholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BookCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #eeeeee;
`;

export const BookCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BookTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inputText};
  line-height: 1.3;
  text-align: left;
`;

export const BookIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statBlue}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: baseline;
`;

export const BookMetaRow = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

export const BookMetaLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inputText};
`;

export const BookCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const BookCopies = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dashboard.statGreen};
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DeleteIconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statRed}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statRed};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.dashboard.statRed}33`};
    color: ${({ theme }) => theme.colors.dashboard.statRed};
  }
`;

export const ReserveIconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statGreen}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.dashboard.statGreen}33`};
    color: ${({ theme }) => theme.colors.dashboard.statGreen};
  }
`;

export const EditIconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.dashboard.statBlue}1a`};
  color: ${({ theme }) => theme.colors.dashboard.statBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 0;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.dashboard.statBlue}1a`};
    color: ${({ theme }) => theme.colors.dashboard.statBlue};
  }
`;
