import { Router } from 'express';

// import logger from '../controller/logger';

const router = Router();

router.use((req, res, next) => {
  const ua = req.get('user-agent');
  if (!ua || !ua.includes('tojurnru')) {
    res.status(400).json({ status: 400 });
    return;
  }
  next();
});

router.post('/message', (req, res) => {
  const { body = [] } = req;
  res.json({ status: 200, count: body.length });
});

export default router;
