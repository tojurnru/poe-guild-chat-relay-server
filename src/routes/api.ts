import { Router } from 'express';
import logger from '../controllers/logger';
import message from '../controllers/message';

const { GUILD_NAME, TOKEN } = process.env;

const router = Router();

logger.debug(`GUILD_NAME: ${GUILD_NAME}, TOKEN: ${TOKEN}`);

router.use((req, res, next) => {
  // @ts-ignore
  const [bearer, token] = req.get('authorization').split(' ');

  // check auth token
  if (token !== TOKEN) {
    res.status(400).json({ status: 400 });
    return;
  }

  // check user agent
  const ua = req.get('user-agent');
  if (!ua || !ua.includes('tojurnru')) {
    res.status(400).json({ status: 400 });
    return;
  }

  next();
});

router.post('/message', (req, res) => {
  const { body = [] } = req;

  message.handle(body);

  res.json({ status: 200, count: body.length });
});

export default router;
