import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { id, timestamps } from './columns.helpers';
import { relations } from 'drizzle-orm';
import { access } from './access.schema';
import { CreateDto, UpdateDto } from '@mmtypes/server/DtoFactory'


export const user = sqliteTable('users', {
  ...id,
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  ...timestamps,
});

export const userRelations = relations(user, ({ many }) => ({
  accesses: many(access),
}));

export const insertUserSchema = createInsertSchema(user, {
  username: z.string(),
  password: z.string(),
});
export const updateUserSchema = insertUserSchema.partial();

export type CreateUserDto = CreateDto<typeof user>
export type UpdateUserDto = UpdateDto<typeof user>
