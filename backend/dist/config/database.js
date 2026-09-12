"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const index_1 = require("./index");
let activeDbUrl = index_1.config.dbUrl;
if (!activeDbUrl) {
    throw new Error('DATABASE_URL environment variable is not set. Please configure backend/.env before starting the server.');
}
// Extract database hostname for TLS Server Name Indication (SNI) routing required by Neon
let dbHost = '';
try {
    const parsedUrl = new URL(activeDbUrl);
    dbHost = parsedUrl.hostname;
}
catch {
    // Fallback if URL parsing fails
}
// Enable SSL automatically for Neon, Render, and cloud PostgreSQL connections
const isSslRequired = activeDbUrl.includes('sslmode=') ||
    activeDbUrl.includes('neon.tech') ||
    activeDbUrl.includes('render.com') ||
    activeDbUrl.includes('supabase.co') ||
    activeDbUrl.includes('amazonaws.com') ||
    process.env.NODE_ENV === 'production';
const pool = new pg_1.Pool({
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
exports.pool = pool;
pool.on('error', (err) => {
    console.error('⚠️ Unexpected idle pg client error in pool:', err.message);
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new client_1.PrismaClient({ adapter });
exports.default = exports.prisma;
