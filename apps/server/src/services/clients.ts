import { client, ClientDto, CreateClientDto, UpdateClientDto } from '@mmschemas/client.schema';
import DB from '../db/config';
import { eq, sql } from 'drizzle-orm';
import { GenericFilter } from '@mmtypes/GenericFilter';
import { GenericFilterResponse } from '@mmtypes/GenericFilterResponse';

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
  return await DB.update(client).set(updateData).where(eq(client.id, id)).returning();
}

async function deleteClient(id: number) {
  return await DB.delete(client).where(eq(client.id, id)).returning();
}

async function searchClients(filter: GenericFilter<ClientDto>): Promise<GenericFilterResponse<ClientDto[]>> {
  const offset = ((filter.page ?? 1) - 1) * (filter.itemsPerPage ?? 10);

  let query = `select ${filter.fields ? filter.fields.join(', ') : '*'} from client where 1 = 1`;

  if (filter.searchTerm) {
    query += ` and name like '%${filter.searchTerm}%'`;
  }

  if (filter.orderByField) {
    query += ` order by ${filter.orderByField}`;
    if (filter.orderByDirection) {
      query += ` ${filter.orderByDirection}`;
    }
  }

  query += ` limit ${filter.itemsPerPage ?? 10} offset ${offset}`;

  const totalQuery = `select count(*) as total from client`;

  try {
    const filteredData = DB.get<ClientDto[]>(sql`${sql.raw(query)}`);
    const totalResult = DB.get<{ total: number }>(sql`${sql.raw(totalQuery)}`);
    const totalElements = totalResult.total;

    return {
      data: filteredData ?? [],
      page: filter.page ?? 1,
      itemsPerPage: filter.itemsPerPage ?? 10,
      totalElements,
    };
  } catch (error) {
    console.error('Error executing searchClients query:', error);
    throw new Error('Failed to fetch clients');
  }
}

export const clientsService = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
};
