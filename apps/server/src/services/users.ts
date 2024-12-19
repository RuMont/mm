import {
  CreateUserDto,
  UpdateUserDto,
  user,
} from '@schemas/user.schema';
import DB from '../db/config';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../utils/password';

async function getUsers() {
  return await DB.select({
    id: user.id,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }).from(user);
}

async function getUserById(id: number) {
  return await DB.select({
    id: user.id,
    username: user.username,
    created_at: user.created_at,
    updated_at: user.updated_at,
  })
    .from(user)
    .where(eq(user.id, id))
    .limit(1);
}

async function createUser(newUser: CreateUserDto) {
  const hashedPassword = await hashPassword(newUser.password);

  return await DB.insert(user)
    .values({
      username: newUser.username,
      password: hashedPassword,
    })
    .returning({
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    });
}

async function updateUser(newUser: UpdateUserDto) {
  const updatedData = { ...newUser };

  if (newUser.password) {
    updatedData.password = await hashPassword(newUser.password);
  }

  return await DB.update(user)
    .set(updatedData)
    .where(eq(user.id, newUser.id))
    .returning({
      id: user.id,
      username: user.username,
      updated_at: user.updated_at,
    });
}

async function deleteUser(id: UpdateUserDto['id']) {
  return await DB.delete(user).where(eq(user.id, id)).returning({
    id: user.id,
    username: user.username,
    deleted_at: user.deleted_at,
  });
}

export const usersService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
