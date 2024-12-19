import { MiddlewareHandler } from 'hono';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

export const jwtAuth: MiddlewareHandler = async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return c.json({ error: 'Authorization token required' }, 401);
  }

  try {
    const decoded = jwt.verify(token, CONFIG.SECRET);
    c.set('user', decoded); // Attach decoded user info to the context
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 403);
  }
};
