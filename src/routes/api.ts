import auth from 'basic-auth';
import { Router } from 'express';
import path from 'path';

import logger from '../controllers/logger';
import message from '../controllers/message';
import client from '../controllers/client';

const { GUILD_TAG } = process.env;
const filename = path.basename(__filename);
const router = Router();

logger.info(`GUILD_TAG: ${GUILD_TAG}`);

const authenticate = (req): string | null => {
  const authorization = req.get('authorization');
  const { name, pass } = auth.parse(authorization);

  // check auth token
  if (pass !== GUILD_TAG) {
    return null;
  }

  // check user agent
  const ua = req.get('user-agent');
  if (!ua || !ua.includes('tojurnru')) {
    return null;
  }

  return name;
};

router.use((req, res, next) => {
  const clientId = authenticate(req);
  if (clientId) {
    req.clientId = clientId;
    next();
  } else {
    res.status(400).json({ status: 400 });
  }
});

router.post('/message', (req, res) => {
  const { clientId, body = [] } = req;

  logger.debug(
    `${filename} | ClientID: ${clientId}, Data Length: ${body.length}`,
  );

  message.handle(body);

  const clients = client.upsertClient(clientId);

  res.json({
    status: 200,
    clients: clients.length,
    received: body.length,
  });
});

export default router;
