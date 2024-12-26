import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { CONFIG } from '../config';

const DB = drizzle(new Database(CONFIG.DB_PATH));

export default DB;
