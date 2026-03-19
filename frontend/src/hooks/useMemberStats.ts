import { useState, useEffect } from 'react';
import { getMemberStats } from '../services/member-dashboard-service';
import type { MemberDashboardStats } from '../pages/member-dashboard/types';

const DEFAULT_STATS: MemberDashboardStats = {
  booksReserved: 0,
  booksOverdue: 0,
};

export const useMemberStats = (): MemberDashboardStats => {
  const [stats, setStats] = useState<MemberDashboardStats>(DEFAULT_STATS);

  useEffect(() => {
    getMemberStats().then(setStats).catch(console.error);
  }, []);

  return stats;
};
