import type React from 'react';

export interface MemberDashboardStats {
  booksReserved: number;
  booksOverdue: number;
}

export interface StatCard {
  label: string;
  description: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}
