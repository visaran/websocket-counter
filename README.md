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

```bash
npm install
```

In two terminals:

```bash
node server.js
```

```bash
npm run dev
```

## Current weaknesses and improvements

- No payload/schema validation | Improve: validate type and fields (light guards or Zod).
- Limited observability | Improve: structured logs with ids/timestamps; count messages.
- No persistence | Improve: persist with localStorage or Redis/DB
- Security | Improve: Replace `ws://` with `wss://`
- No authentication/authorization | Improve: add auth with JWT, rate limiting and origin checks.
- Close connections gracefully | Improve: add `process.on("SIGINT")`
- Production edges | Improve: env-based URL
