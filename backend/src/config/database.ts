import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from './index';

const pool = new Pool({ connectionString: config.dbUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
export { pool };
export default prisma;
