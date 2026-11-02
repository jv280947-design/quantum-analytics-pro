import { Router } from 'express';
import { customers } from '../data.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, (_req, res) => {
  res.json({
    customers,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.revenue, 0),
    activeAccounts: customers.filter((customer) => customer.status === 'Active').length,
  });
});

export default router;
