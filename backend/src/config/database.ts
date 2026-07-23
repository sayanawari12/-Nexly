import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from './index';

// Enable SSL automatically for Neon, Render, and cloud PostgreSQL connections
const isSslRequired =
  config.dbUrl.includes('sslmode=') ||
  config.dbUrl.includes('neon.tech') ||
  config.dbUrl.includes('render.com') ||
  config.dbUrl.includes('supabase.co') ||
  config.dbUrl.includes('amazonaws.com') ||
  process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: isSslRequired ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
export { pool };
export default prisma;
