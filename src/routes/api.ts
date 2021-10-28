import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'hello api' });
});

export default router;
