import { Hono } from 'hono';
import DB from '../db/config';
import { user, insertUserSchema, updateUserSchema } from '@schemas/user.schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../utils/password';
import { idParamSchema } from '../utils/validation';

const users = new Hono();

// GET: Retrieve all users
users.get('/', async (c) => {
  const usersList = await DB.select({
    id: user.id,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }).from(user);
  return c.json({ users: usersList });
});

// GET: Retrieve a single user by ID
users.get('/:id', zValidator('param', idParamSchema), async (c) => {
  const id = Number(c.req.param('id'));
  const [foundUser] = await DB.select({
    id: user.id,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
  })
    .from(user)
    .where(eq(user.id, id))
    .limit(1);

  if (!foundUser) {
    return c.json({ error: `User with ID ${id} not found` }, 404);
  }

  return c.json({ user: foundUser });
});

// POST: Create a new user
users.post('/', zValidator('json', insertUserSchema), async (c) => {
  const body = await c.req.json<typeof user.$inferInsert>();

  const hashedPassword = await hashPassword(body.password);

  const [newUser] = await DB.insert(user)
    .values({
      username: body.username,
      password: hashedPassword,
    })
    .returning({
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    });

  return c.json({ message: 'User created successfully', user: newUser }, 201);
});

// PUT: Update an existing user
users.put(
  '/:id',
  zValidator('param', idParamSchema),
  zValidator('json', updateUserSchema),
  async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<typeof user.$inferInsert>();

    const updatedData = { ...body };
    if (body.password) {
      updatedData.password = await hashPassword(body.password);
    }

    const [updatedUser] = await DB.update(user)
      .set(updatedData)
      .where(eq(user.id, id))
      .returning({
        id: user.id,
        username: user.username,
        updated_at: user.updated_at,
      });

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

  const [deletedUser] = await DB.delete(user).where(eq(user.id, id)).returning({
    id: user.id,
    username: user.username,
    deleted_at: user.deleted_at,
  });

  if (!deletedUser) {
    return c.json({ error: `User with ID ${id} not found` }, 404);
  }

  return c.json({ message: 'User deleted successfully', user: deletedUser });
});

export default users;
