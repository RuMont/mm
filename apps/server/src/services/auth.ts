import { AuthCredentials } from '@mmtypes/AuthCredentials';
import { TokenOrFail } from '@mmtypes/server/TokenOrFail';
import { usersService } from './users';
import { comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';
import DB from '../db/config';
import { access } from '@mmschemas/access.schema';
import { and, eq } from 'drizzle-orm';

async function login(credentials: AuthCredentials): Promise<TokenOrFail> {
  const [user] = await usersService.getUserByUsername(credentials.username);
  if (!user) throw new Error('Credenciales no válidas');

  const isPasswordValid = await comparePassword(
    credentials.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error('Credenciales no válidas');
  }

  const FOUR_HOURS = 14400;

  const token = jwt.sign(
    { id: user.id, username: user.username },
    CONFIG.SECRET,
    {
      expiresIn: FOUR_HOURS,
    }
  );

  await createAccess(user.id, token, FOUR_HOURS);
  return token;
}

async function createAccess(userId: number, token: string, expiresIn: number) {
  const expiresAt = new Date(Date.now() + expiresIn * 1000).getTime();

  await DB.insert(access).values({
    userId,
    token,
    expiresAt,
    revoked: 0,
  });
}

async function revokeToken(userId: number) {
  return await DB.update(access)
    .set({
      revoked: 1,
    })
    .where(and(eq(access.userId, userId), eq(access.revoked, 0)));
}

async function checkTokenValidity(token: string) {
  const [entry] = await DB.select()
    .from(access)
    .where(eq(access.token, token))
    .limit(1);
  if (entry.revoked) return false;
  if (Date.now() > entry.expiresAt) return false;
  return true;
}

export const authService = {
  login,
  revokeToken,
  checkTokenValidity,
};
