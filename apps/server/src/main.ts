import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/api', (c) => c.json({ message: 'Welcome to the API!' }));

// Start the server
const port = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(port),
});

console.log(`Server is running on http://localhost:${port}`);
