import {
  client,
  CreateClientDto,
  UpdateClientDto,
} from '@mmschemas/client.schema';
import DB from '../db/config';
import { eq, sql } from 'drizzle-orm';
import { GenericFilter } from '@mmtypes/GenericFilter';

async function getClients() {
  return await DB.select().from(client);
}

async function getClientById(id: number) {
  return await DB.select().from(client).where(eq(client.id, id)).limit(1);
}

async function createClient(createData: CreateClientDto) {
  return await DB.insert(client).values(createData).returning();
}

async function updateClient(id: number, updateData: UpdateClientDto) {
  return await DB.update(client)
    .set(updateData)
    .where(eq(client.id, id))
    .returning();
}

async function deleteClient(id: number) {
  return await DB.delete(client).where(eq(client.id, id)).returning();
}

async function searchClients(filter: GenericFilter) {
  const offset = ((filter.page ?? 1) - 1) * (filter.itemsPerPage ?? 10);

  let query = `select ${filter.fields ? filter.fields.join(', ') : '*'} from client where 1 = 1`;

  if (filter.searchTerm) {
    query += ` and name like '%${filter.searchTerm}%'`;
  }

  if (filter.orderBy?.field && filter.orderBy?.direction) {
    query += ` order by ${filter.orderBy.field} ${filter.orderBy.direction}`;
  }

  query += ` limit ${(filter.itemsPerPage ?? 10)} offset ${offset}`;

  return sql`${query}`;
}

export const clientsService = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
};
