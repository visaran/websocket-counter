# Realtime Counter (Next.js + WebSocket)

A tiny end-to-end demo showing a Next.js client that keeps a counter and a Node.js WebSocket server that, once per second, asks every connected client for its current counter value. Each client replies with its number and the server logs the responses.

> Server file: server.js (in the repo root)

## Features

- Minimal WebSocket server using ws
- Each connection gets a UUID (via uuid)
- Server broadcasts { type: "request_counter" } every 1s
- Client replies { type: "counter_value", value: <current> }
- Works with multiple tabs (you’ll see each tab’s value in the server logs)

## Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

## Instructions to run

In two terminals:

```bash
node server.js
```

```bash
npm run dev
```
