import { Hono } from 'hono';
import { type AuthCredentials } from '@mmtypes/AuthCredentials';
import { authService } from '../services/auth';

export const auth = new Hono();

auth.post('/login', async (c) => {
  const body = await c.req.json<AuthCredentials>();

  try {
    const token = await authService.login(body);
    c.json({
      message: 'Ingreso realizado con éxito',
      token,
    });
  } catch (e: unknown) {
    const error = e as Error;
    c.json(
      {
        error: error.message,
      },
      401
    );
  }
});
