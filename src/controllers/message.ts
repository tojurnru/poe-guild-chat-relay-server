import discord from '../api/discord';

type Line = {
  member: string;
  message: string;
  time?: number;
};

const EXPIRE_MS = 30 * 1000; // 30 seconds

let history: Line[] = [];
let newLines: Line[] = [];

/**
 * Functions
 */

export const clearHistory = () => {
  const expiry = Date.now() - EXPIRE_MS;

  history = history.filter((line) => {
    return line.time && line.time > expiry;
  });
};

export const sendToDiscord = async () => {
  if (newLines.length === 0) return;

  const lines = newLines;
  newLines = [];

  const messages = lines.map(({ member, message }) => {
    return `\`${member} \`: ${message}`;
  });

  await discord.postMessage(messages.join('\n'));
};

/**
 * Handle Messages
 */

const handle = (lines: Line[]) => {
  for (const line of lines) {
    const { member, message } = line;

    // skip old messages
    const found = history.find((h) => {
      return h.member === member && h.message === message;
    });
    if (found) {
      continue;
    }

    // add into history and newLines
    line.time = Date.now();
    history.push(line);
    newLines.push(line);
  }
};

export default {
  clearHistory,
  sendToDiscord,
  handle,
};
