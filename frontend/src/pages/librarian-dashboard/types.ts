import type React from 'react';

export interface StatCard {
  label: string;
  description: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

export interface LibrarianDashboardStats {
  totalMembers: number;
  totalBooks: number;
  totalBooksBorrowed: number;
  totalBooksOverdue: number;
}

export type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};
