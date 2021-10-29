import axios from 'axios';

import { axiosErrorHandler } from './errorHandler';

const { DISCORD_WEBHOOK_ID = '', DISCORD_WEBHOOK_HASH = '' } = process.env;

const WEBHOOK_URL = `https://discord.com/api/webhooks/${DISCORD_WEBHOOK_ID}/${DISCORD_WEBHOOK_HASH}`;
const HEADERS = { 'Content-Type': 'application/json' };

export const postMessage = async (message: string): Promise<void> => {
  try {
    const body = { content: message };
    const config = { headers: HEADERS };
    await axios.post(WEBHOOK_URL, body, config);
  } catch (error) {
    if (axios.isAxiosError(error)) axiosErrorHandler(error);
    throw error;
  }
};

export default { postMessage };
