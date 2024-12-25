import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { user } from './user.schema';

export const access = sqliteTable('accesses', {
  ...id,
  userId: integer('user_id').references(() => user.id, {onDelete: 'cascade'}).notNull(),
  token: text('token').notNull(),
  /** date in milliseconds */
  expiresAt: integer('expires_at').notNull(),
  revoked: integer('revoked').notNull(),
  ...timestamps,
});
