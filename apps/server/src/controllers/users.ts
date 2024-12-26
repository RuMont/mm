import { Hono } from 'hono';
import { insertUserSchema, updateUserSchema, CreateUserDto, UpdateUserDto } from '@mmschemas/user.schema';
import { zValidator } from '@hono/zod-validator';
import { idParamSchema } from '../utils/validation';
import { usersService } from '../services/users';
import { jwtAuth } from '../middlewares/jwt';
import { ServerVariables } from '@mmtypes/server/ServerVariables';

export const users = new Hono<{ Variables: ServerVariables }>();

users.use(jwtAuth);

users.get('/', async (c) => {
  const usersList = await usersService.getUsers();

  return c.json({ users: usersList });
});

users.get('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));

  const [foundUser] = await usersService.getUserById(id);

  if (!foundUser) {
    return c.json({ error: `Usuario con id ${id} no encontrado` }, 404);
  }

  return c.json({ user: foundUser });
});

users.post('/', zValidator('json', insertUserSchema), async (c) => {
  const body = (await c.get('body')) as CreateUserDto;

  const [newUser] = await usersService.createUser(body);

  return c.json({ message: 'Usuario creado con éxito', user: newUser }, 201);
});

users.put('/:id', zValidator('param', idParamSchema), zValidator('json', updateUserSchema), async (c) => {
  const id = Number(c.req.param('id'));
  const body = (await c.get('body')) as UpdateUserDto;

  const [updatedUser] = await usersService.updateUser(body);

  if (!updatedUser) {
    return c.json({ error: `Usuario con id ${id} no encontrado o no actualizado` }, 404);
  }

  return c.json({ message: 'Usuario actualizado con éxito', user: updatedUser });
});

users.delete('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));

  const [deletedUser] = await usersService.deleteUser(id);

  if (!deletedUser) {
    return c.json({ error: `Usuario con id ${id} no encontrado` }, 404);
  }

  return c.json({ message: 'Usuario eliminado con éxito', user: deletedUser });
});
