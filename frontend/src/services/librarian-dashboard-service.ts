import api from './api';
import type { LibrarianDashboardStats } from '../pages/librarian-dashboard/types';

interface StatsAttributes {
  total_members: number;
  total_books: number;
  total_books_borrowed: number;
  total_books_overdue: number;
}

interface JsonApiStatsResponse {
  data: {
    id: string;
    type: string;
    attributes: StatsAttributes;
  };
}

const deserializeStats = (attributes: StatsAttributes): LibrarianDashboardStats => ({
  totalMembers: attributes.total_members,
  totalBooks: attributes.total_books,
  totalBooksBorrowed: attributes.total_books_borrowed,
  totalBooksOverdue: attributes.total_books_overdue,
});

export const getLibrarianStats = async (): Promise<LibrarianDashboardStats> => {
  const response = await api.get<JsonApiStatsResponse>('/dashboard/librarian/stats');
  return deserializeStats(response.data.data.attributes);
};
