import { type JwtPayload } from 'jsonwebtoken';

export type ServerVariables = {
  user: JwtPayload & { id: number; username: string };
  body: unknown;
};
