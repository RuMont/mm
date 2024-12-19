import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { id, timestamps } from './columns.helpers';

export const user = sqliteTable('users', {
  ...id,
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  ...timestamps,
});

export const insertUserSchema = createInsertSchema(user, {
  username: z.string(),
  password: z.string(),
});
export const updateUserSchema = insertUserSchema.partial();

export type CreateUserDto = typeof user.$inferInsert;
export type UpdateUserDto = CreateUserDto & {
  id: (typeof user.$inferSelect)['id'];
};
