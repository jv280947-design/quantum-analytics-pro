import { Router } from 'express';
import { z } from 'zod';
import { customers } from '../data.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const customerSchema = z.object({
  name: z.string().min(2),
  segment: z.enum(['Enterprise', 'Growth', 'SMB', 'Operations']),
  revenue: z.number().min(0),
  health: z.enum(['Healthy', 'Watch', 'Needs review']),
  status: z.enum(['Active', 'At risk', 'Paused']),
});

router.get('/', requireAuth, (_req, res) => {
  res.json(customers);
});

router.post('/', requireAuth, (req, res) => {
  const parsed = customerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid customer payload.' });
  }

  const newCustomer = {
    id: `cus_${Date.now()}`,
    ...parsed.data,
  };

  customers.push(newCustomer);
  return res.status(201).json(newCustomer);
});

export default router;
