import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { type ServerVariables } from '@mmtypes/server/ServerVariables';
import { authService } from '../services/auth';
import { jwtAuth } from '../middlewares/jwt';
import { z } from 'zod';

export const auth = new Hono<{ Variables: ServerVariables }>();

auth.post('/login', async (c) => {
  const body = await c.get('body');

  try {
    const credentials = z
      .object({
        username: z.string().min(1, 'Username is required'),
        password: z.string().min(1, 'Password is required'),
      })
      .parse(body);

    const token = await authService.login(credentials);
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

auth.get('/logout', jwtAuth, async (c) => {
  const token = c.get('user');
  await authService.revokeToken(token.id);
  return c.json({
    message: 'Sesión terminada',
  });
});

auth.get('/checktokenvalidity', async (c) => {
  const authHeader = c.req.header('Authorization');
  console.log('tiene header');
  if (!authHeader) return c.json({ valid: false });

  const token = authHeader.split(' ')[1];
  console.log('tiene token');
  if (!token) return c.json({ valid: false });

  const isTokenValid = await authService.checkTokenValidity(token);
  console.log('es valido?', isTokenValid);
  return c.json({ valid: isTokenValid });
});
