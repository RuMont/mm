import { DataSource } from 'typeorm';
import entities from '@entities';

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  synchronize: true,
  database: './database/db.sqlite',
  logger: 'advanced-console',
  logging: 'all',
  migrations: ['migrations'],
  entities: entities,
});
