import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'hello index' });
});

export default router;
