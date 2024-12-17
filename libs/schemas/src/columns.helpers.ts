import { sql } from 'drizzle-orm';
import { integer, text } from 'drizzle-orm/sqlite-core';

export const timestamps = {
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text('updated_at').$onUpdate(() => sql`(current_timestamp)`),
  deleted_at: text('deleted_at'),
};

export const id = {
  id: integer('id').primaryKey(),
};
