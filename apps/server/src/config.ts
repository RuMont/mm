import { loadEnvFile } from 'process';
import { z } from 'zod';

loadEnvFile('./.env');

const { PORT = 3000, DB_PATH = 'apps/server/src/db/db.sqlite', SECRET = 'dev' } = process.env;

const ConfigSchema = z.object({
  PORT: z.preprocess((value) => Number(value), z.number().int().positive()),
  DB_PATH: z.string().min(1, 'DB_PATH must be a non-empty string'),
  SECRET: z.string().min(1, 'SECRET must be a non-empty string'),
});

export const CONFIG = new Proxy(
  Object.freeze(
    ConfigSchema.parse({
      PORT,
      DB_PATH,
      SECRET,
    }),
  ),
  {
    set(t, k) {
      throw new Error(`Cannot modify readonly CONFIG property: ${String(k)}`);
    },
    deleteProperty(t, k) {
      throw new Error(`Cannot delete readonly CONFIG property: ${String(k)}`);
    },
  },
);
