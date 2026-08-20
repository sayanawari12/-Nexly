import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from './index';


let activeDbUrl = config.dbUrl;
if (!activeDbUrl) {
  throw new Error('DATABASE_URL environment variable is not set. Please configure backend/.env before starting the server.');
}


// Extract database hostname for TLS Server Name Indication (SNI) routing required by Neon
let dbHost = '';
try {
  const parsedUrl = new URL(activeDbUrl);
  dbHost = parsedUrl.hostname;
} catch {
  // Fallback if URL parsing fails
}

// Enable SSL automatically for Neon, Render, and cloud PostgreSQL connections
const isSslRequired =
  activeDbUrl.includes('sslmode=') ||
  activeDbUrl.includes('neon.tech') ||
  activeDbUrl.includes('render.com') ||
  activeDbUrl.includes('supabase.co') ||
  activeDbUrl.includes('amazonaws.com') ||
  process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: activeDbUrl,
  ssl: isSslRequired
    ? {
        rejectUnauthorized: false,
        ...(dbHost ? { servername: dbHost } : {}),
      }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

pool.on('error', (err) => {
  console.error('⚠️ Unexpected idle pg client error in pool:', err.message);
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
export { pool };
export default prisma;

