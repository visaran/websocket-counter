'use client';
import React, { useEffect, useRef, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[client] client connected');
    };

    ws.onmessage = event => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        console.log('[client] INVALID JSON');
        return;
      }

      if (data.type === 'request_counter') {
        ws.send(
          JSON.stringify({
            type: 'counter_value',
            value: countRef.current,
          })
        );
      }
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>increment</button>
    </div>
  );
}

export default Counter;
