import { Hono } from 'hono';
import { jwtAuth } from '../middlewares/jwt';
import { clientsService } from '../services/clients';
import { idParamSchema, searchClientsSchema } from '../utils/validation';
import { zValidator } from '@hono/zod-validator';
import { CreateClientDto, insertClientSchema, UpdateClientDto, updateClientSchema } from '@mmschemas/client.schema';
import { ServerVariables } from '@mmtypes/server/ServerVariables';

export const clients = new Hono<{ Variables: ServerVariables }>();

clients.use(jwtAuth);

clients.get('/', async (c) => {
  const allClients = await clientsService.getClients();
  return c.json(allClients);
});

clients.get('/search', zValidator('query', searchClientsSchema), async (c) => {
  const filter = searchClientsSchema.parse(c.req.query());
  const results = await clientsService.searchClients(filter);
  return c.json(results);
});

clients.get('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));
  const [client] = await clientsService.getClientById(id);
  if (!client) return c.json({ error: 'Cliente no encontrado' }, 404);
  return c.json(client);
});

clients.post('/', zValidator('json', insertClientSchema), async (c) => {
  const createData = (await c.get('body')) as CreateClientDto;
  const [client] = await clientsService.createClient(createData);
  return c.json({ message: 'Cliente creado con éxito', client }, 201);
});

clients.put('/:id', zValidator('param', idParamSchema), zValidator('json', updateClientSchema), async (c) => {
  const id = Number(c.req.param('id'));
  const updateData = (await c.get('body')) as UpdateClientDto;
  const [updatedClient] = await clientsService.updateClient(id, updateData);
  if (!updatedClient) return c.json({ error: 'Cliente no encontrado o no actualizado' }, 404);
  return c.json({
    message: 'Cliente actualizado con éxito',
    client: updatedClient,
  });
});

clients.delete('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));
  const [deletedClient] = await clientsService.deleteClient(id);
  if (!deletedClient) return c.json({ error: 'Cliente no encontrado' }, 404);
  return c.json({
    message: 'Cliente eliminado con éxito',
    client: deletedClient,
  });
});
