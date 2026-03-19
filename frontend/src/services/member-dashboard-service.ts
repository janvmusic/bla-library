import api from './api';
import type { MemberDashboardStats } from '../pages/member-dashboard/types';

interface StatsResponse {
  books_reserved: number;
  books_overdue: number;
}

const deserializeStats = (data: StatsResponse): MemberDashboardStats => ({
  booksReserved: data.books_reserved,
  booksOverdue: data.books_overdue,
});

export const getMemberStats = async (): Promise<MemberDashboardStats> => {
  const response = await api.get<StatsResponse>('/dashboard/member/stats');
  return deserializeStats(response.data);
};
