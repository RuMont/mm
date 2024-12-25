import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { users } from './controllers/users';
import { CONFIG } from './config';
import { auth } from './controllers/auth';
import { clients } from './controllers/clients';
import { ensureJsonBody } from './middlewares/body';

try {
  const app = new Hono();

  app.use(prettyJSON());
  app.use('*', cors());
  app.use('*', ensureJsonBody);
  app.use(logger());

  app.route('/users', users);
  app.route('/auth', auth);
  app.route('/clients', clients);

  app.get('/', (c) => c.json({ message: 'Welcome to the API!' }));

  const port = CONFIG.PORT;

  serve({
    fetch: app.fetch,
    port: Number(port),
  });

  console.log(`Server is running on http://localhost:${port}`);
} catch (error) {
  console.log(error);
}
