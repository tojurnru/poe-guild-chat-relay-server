import logger from './logger';
import { postMessage } from '../api/discord';

const { GUILD_NAME } = process.env;

type Line = {
  guild: string;
  member: string;
  message: string;
};

const MAX = 50;
const history: Line[] = [];
let newMessages: string[] = [];

const sendToDiscord = async () => {
  if (newMessages.length > 0) {
    const messages = newMessages;
    newMessages = [];
    await postMessage(messages.join('\n'));
  }

  setTimeout(sendToDiscord, 1500);
};

// start the loop
sendToDiscord();

const handle = (lines: Line[]) => {
  logger.debug(`message received: ${lines.length}`);

  for (const line of lines) {
    const { guild, member, message } = line;

    // filter other guild messages
    if (guild !== GUILD_NAME) continue;

    // filter old messages
    const found = history.find((h) => {
      return h.member === member && h.message === message;
    });
    if (found) continue;

    // update history
    history.push(line);
    if (history.length > MAX) {
      history.shift();
    }

    // convert to string and add to queue
    newMessages.push(`\`${member}\`: ${message}`);
  }
};

export default {
  handle,
};
