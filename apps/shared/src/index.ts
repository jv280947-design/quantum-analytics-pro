export type DashboardSummary = {
  monthlyRevenue: number;
  activeCustomers: number;
  retentionRate: number;
  churnRisk: number;
  forecast: number;
  pipeline: number;
};

export type Role = 'admin' | 'manager' | 'analyst' | 'viewer';
