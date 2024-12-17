import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { envVars } from '../env';

const DB = drizzle((new Database(envVars.dbPath)));

export default DB;
