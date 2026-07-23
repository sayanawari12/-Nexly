import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from './index';

const DEFAULT_NEON_URL = 'postgresql://neondb_owner:REDACTED_PASSWORD@localhost/neondb?sslmode=require';

let activeDbUrl = config.dbUrl;
if (!activeDbUrl || activeDbUrl.includes('@host:') || activeDbUrl.includes('@host/') || activeDbUrl.includes('user:password') || (activeDbUrl.includes('localhost') && process.env.NODE_ENV === 'production')) {
  activeDbUrl = process.env.FALLBACK_DATABASE_URL || DEFAULT_NEON_URL;
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

