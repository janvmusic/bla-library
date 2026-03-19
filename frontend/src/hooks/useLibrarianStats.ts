import { useState, useEffect } from 'react';
import { getLibrarianStats } from '../services/librarian-dashboard-service';
import type { LibrarianDashboardStats } from '../pages/librarian-dashboard/types';

const DEFAULT_STATS: LibrarianDashboardStats = {
  totalMembers: 0,
  totalBooks: 0,
  totalBooksBorrowed: 0,
  totalBooksOverdue: 0,
};

export const useLibrarianStats = (): LibrarianDashboardStats => {
  const [stats, setStats] = useState<LibrarianDashboardStats>(DEFAULT_STATS);

  useEffect(() => {
    getLibrarianStats().then(setStats).catch(console.error);
  }, []);

  return stats;
};
