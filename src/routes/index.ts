import { Router } from 'express';
import pkg from '../../package.json';

const router = Router();
const { name, version } = pkg;

router.get('/', (req, res) => {
  res.json({ name, version });
});

router.all('/request', (req, res) => {
  const {
    hostname,
    ip,
    ips,
    url,
    baseUrl,
    originalUrl,
    method,
    rawHeaders,
    cookies,
    params,
    query,
    body,
  } = req;

  res.json({
    hostname,
    ip,
    ips,
    url,
    baseUrl,
    originalUrl,
    method,
    rawHeaders,
    cookies,
    params,
    query,
    body,
  });
});

export default router;
