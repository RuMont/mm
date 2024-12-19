import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { type AuthCredentials } from '@mmtypes/AuthCredentials';
import { authService } from '../services/auth';

export const auth = new Hono();

auth.post('/login', async (c) => {
  const body = await c.req.json<AuthCredentials>();

  try {
    const token = await authService.login(body);
    return c.json({
      message: 'Ingreso realizado con éxito',
      token,
    });
  } catch (e: unknown) {
    const { message } = e as Error;
    throw new HTTPException(401, {
      res: new Response(
        JSON.stringify({
          message,
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ),
    });
  }
});
