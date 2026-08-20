import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables for the seed script
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Languages (decoupled from internal UUIDs)
  const languages = [
    {
      displayName: 'C (GCC 9.2.0)',
      version: 'GCC 9.2.0',
      fileExtension: 'c',
      isCompiled: true,
      isActive: true,
    },
    {
      displayName: 'C++ (GCC 9.2.0)',
      version: 'GCC 9.2.0',
      fileExtension: 'cpp',
      isCompiled: true,
      isActive: true,
    },
    {
      displayName: 'Java (OpenJDK 13.0.1)',
      version: 'OpenJDK 13.0.1',
      fileExtension: 'java',
      isCompiled: true,
      isActive: true,
    },
    {
      displayName: 'Python (3.8.1)',
      version: '3.8.1',
      fileExtension: 'py',
      isCompiled: false,
      isActive: true,
    },
    {
      displayName: 'JavaScript (Node.js 12.14.0)',
      version: 'Node.js 12.14.0',
      fileExtension: 'js',
      isCompiled: false,
      isActive: true,
    },
  ];

  for (const lang of languages) {
    const existing = await prisma.language.findFirst({ where: { fileExtension: lang.fileExtension } });
    if (existing) {
      await prisma.language.update({ where: { id: existing.id }, data: lang });
    } else {
      await prisma.language.create({ data: lang });
    }
  }
  console.log(`✅ Seeded ${languages.length} programming languages.`);

  // 2. Seed Optional Default Admin Account
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@apex.domain';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword && process.env.NODE_ENV === 'production') {
    throw new Error('❌ Cannot seed admin account in production without explicit ADMIN_PASSWORD set in environment variables!');
  }

  const effectivePassword = adminPassword || 'admin123';
  
  // Hash password using 10 salt rounds
  const passwordHash = await bcrypt.hash(effectivePassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      username: adminUsername,
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      username: adminUsername,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Seeded Admin Account: email=${adminEmail}, role=ADMIN`);
  console.log('🎉 Seeding process completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding process encountered an error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // close pg connection pool
  });
