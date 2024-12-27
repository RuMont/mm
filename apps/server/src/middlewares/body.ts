import { MiddlewareHandler } from 'hono';

export const ensureJsonBody: MiddlewareHandler = async (c, next) => {
  if (c.req.method === 'POST' || c.req.method === 'PUT' || c.req.method === 'PATCH') {
    try {
      const body = await c.req.json();
      if (!body) {
        return c.json({ error: 'Empty body' }, 400);
      }
      c.set('body', body);
    } catch (err) {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
  }
  await next();
};
