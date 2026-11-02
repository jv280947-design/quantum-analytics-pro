import { Router } from 'express';
import { dashboardSummary } from '../data.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/summary', requireAuth, (_req, res) => {
  res.json({
    summary: dashboardSummary,
    generatedAt: new Date().toISOString(),
  });
});

export default router;
