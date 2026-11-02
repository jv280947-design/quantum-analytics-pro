export type Role = 'admin' | 'manager' | 'analyst' | 'viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  segment: 'Enterprise' | 'Growth' | 'SMB' | 'Operations';
  revenue: number;
  health: 'Healthy' | 'Watch' | 'Needs review';
  status: 'Active' | 'At risk' | 'Paused';
};

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Admin User',
    email: 'admin@quantumpro.io',
    password: '$2a$10$Q5tI8Uq/1bNgK5N1iYpmMO9qs00Y0bkA1y6vlaQJMxfr0P6hYkQ6e',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const customers: Customer[] = [
  {
    id: 'cus_001',
    name: 'Northwind Labs',
    segment: 'Enterprise',
    revenue: 148000,
    health: 'Healthy',
    status: 'Active',
  },
  {
    id: 'cus_002',
    name: 'Crestline Media',
    segment: 'Growth',
    revenue: 91000,
    health: 'Watch',
    status: 'At risk',
  },
  {
    id: 'cus_003',
    name: 'Blue Harbor Ops',
    segment: 'Operations',
    revenue: 72000,
    health: 'Healthy',
    status: 'Active',
  },
  {
    id: 'cus_004',
    name: 'Aster Digital',
    segment: 'SMB',
    revenue: 58000,
    health: 'Needs review',
    status: 'Paused',
  },
];

export const dashboardSummary = {
  monthlyRevenue: 482400,
  activeCustomers: 1284,
  retentionRate: 96.2,
  churnRisk: 3.8,
  forecast: 1135000,
  pipeline: 1300000,
};
