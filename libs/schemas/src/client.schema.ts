import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { id, timestamps } from './columns.helpers';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { CreateDto, UpdateDto } from '@mmtypes/server/DtoFactory';

export const client = sqliteTable('client', {
  ...id,
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  active: integer('is_active').default(0),
  birthDate: text('birth_date'),
  ...timestamps,
});

export const insertClientSchema = createInsertSchema(client);
export const updateClientSchema = createUpdateSchema(client);

export type CreateClientDto = CreateDto<typeof client>
export type UpdateClientDto = UpdateDto<typeof client>
