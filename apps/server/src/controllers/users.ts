import { Hono } from 'hono';
import {
  insertUserSchema,
  updateUserSchema,
  CreateUserDto,
  UpdateUserDto,
} from '@schemas/user.schema';
import { zValidator } from '@hono/zod-validator';
import { idParamSchema } from '../utils/validation';
import { usersService } from '../services/users';

export const users = new Hono();

users.get('/', async (c) => {
  const usersList = await usersService.getUsers();

  return c.json({ users: usersList });
});

users.get('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));

  const [foundUser] = await usersService.getUserById(id);

  if (!foundUser) {
    return c.json({ error: `User with ID ${id} not found` }, 404);
  }

  return c.json({ user: foundUser });
});

users.post('/', zValidator('json', insertUserSchema), async (c) => {
  const body = await c.req.json<CreateUserDto>();

  const [newUser] = await usersService.createUser(body);

  return c.json({ message: 'User created successfully', user: newUser }, 201);
});

users.put(
  '/:id',
  zValidator('param', idParamSchema),
  zValidator('json', updateUserSchema),
  async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<UpdateUserDto>();

    const [updatedUser] = await usersService.updateUser(body);

    if (!updatedUser) {
      return c.json(
        { error: `User with ID ${id} not found or not updated` },
        404
      );
    }

    return c.json({ message: 'User updated successfully', user: updatedUser });
  }
);

users.delete('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));

  const [deletedUser] = await usersService.deleteUser(id);

  if (!deletedUser) {
    return c.json({ error: `User with ID ${id} not found` }, 404);
  }

  return c.json({ message: 'User deleted successfully', user: deletedUser });
});
