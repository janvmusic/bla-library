import type React from 'react';

export interface StatCard {
  label: string;
  description: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

export type NavItem = {
  label: string;
  path: string;
  active?: boolean;
};
