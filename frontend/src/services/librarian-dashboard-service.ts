import api from './api';
import type { LibrarianDashboardStats } from '../pages/librarian-dashboard/types';

interface StatsResponse {
  total_members: number;
  total_books: number;
  total_books_borrowed: number;
  total_books_overdue: number;
}

const deserializeStats = (data: StatsResponse): LibrarianDashboardStats => ({
  totalMembers: data.total_members,
  totalBooks: data.total_books,
  totalBooksBorrowed: data.total_books_borrowed,
  totalBooksOverdue: data.total_books_overdue,
});

export const getLibrarianStats = async (): Promise<LibrarianDashboardStats> => {
  const response = await api.get<StatsResponse>('/dashboard/librarian/stats');
  return deserializeStats(response.data);
};
