import client from './client';
import message from './message';

export const processLoop = async () => {
  client.clearExpiredClients();
  message.clearHistory();
  await message.sendToDiscord();

  setTimeout(processLoop, 2000);
};

export default { processLoop };
