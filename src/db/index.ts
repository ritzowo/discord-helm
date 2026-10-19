import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { config } from '../config.js';
import * as schema from './schema.js';

type Db = NodePgDatabase<typeof schema>;

let pool: pg.Pool | undefined;
let instance: Db | undefined;

const migrationsFolder = fileURLToPath(new URL('../../drizzle', import.meta.url));

export function getDb(): Db {
  if (!instance) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return instance;
}

export async function initDb(): Promise<Db> {
  if (instance) return instance;

  pool = new pg.Pool({ connectionString: config.databaseUrl });
  const db = drizzle(pool, { schema });
  await migrate(db, { migrationsFolder });

  instance = db;
  return db;
}

export async function closeDb(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
    instance = undefined;
  }
}
