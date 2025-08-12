const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

const clients = new Map();

const wss = new WebSocket.Server({ port: PORT });

wss.on('listening', () => {
  console.log(`WS Server listening on ws://localhost:${PORT}`);
});

wss.on('connection', (ws, req) => {
  ws.isAlive = true;

  ws.on('pong', () => (ws.isAlive = true));

  const clientId = uuidv4();
  clients.set(ws, clientId);

  console.log(`[server] client #${clientId} connected`);

  ws.on('message', message => {
    let payload;
    try {
      payload = JSON.parse(message);
    } catch {
      console.log('[server] INVALID JSON');
    }

    if (payload.type === 'counter_value') {
      console.log(`Client #${clientId} count is: ${payload.value}`);
    }
  });

  ws.on('close', () => {
    console.log(`[server] client #${clientId} disconnected`);
  });
});

const hb = setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 10000);

const interval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'request_counter',
        })
      );
    }
  });
}, 1000);

wss.on('close', () => {
  clearInterval(interval);
  clearInterval(hb);
});
