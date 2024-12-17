import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger'
import { envVars } from './env';
import users from './controllers/users';

try {
  const app = new Hono();

  app.use(prettyJSON());
  app.use('/*', cors());
  app.use(logger());

  app.route('/users', users);

  app.get('/', (c) => c.json({ message: 'Welcome to the API!' }));

  const port = envVars.port;

  serve({
    fetch: app.fetch,
    port: Number(port),
  });

  console.log(`Server is running on http://localhost:${port}`);
} catch (error) {
  console.log(error);
}
