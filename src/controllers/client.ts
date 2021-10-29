type Client = {
  id: string;
  time: number;
};

const EXPIRE_MS = 30 * 1000; // 30 seconds

let clients: Client[] = [];

export const upsertClient = (id: string) => {
  let notFound = true;

  for (const client of clients) {
    if (client.id === id) {
      client.time = Date.now();
      notFound = false;
      break;
    }
  }

  if (notFound) {
    clients.push({ id, time: Date.now() });
  }

  return clients;
};

export const clearExpiredClients = () => {
  const expiry = Date.now() - EXPIRE_MS;

  clients = clients.filter((client) => {
    return client.time > expiry;
  });
};

export default { upsertClient, clearExpiredClients };
