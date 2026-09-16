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

  // 3. Seed Learning Content Pillar (Python Technology -> Beginner Track -> Module -> Lessons -> Skills -> Problem Links)
  console.log('🌱 Seeding Learning Content Pillar (Python)...');

  const pythonTech = await prisma.technology.upsert({
    where: { slug: 'python' },
    update: {
      name: 'Python',
      description: 'Master Python programming from fundamentals to real-world applications.',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      order: 1,
    },
    create: {
      name: 'Python',
      slug: 'python',
      description: 'Master Python programming from fundamentals to real-world applications.',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      order: 1,
    },
  });

  const beginnerTrack = await prisma.track.create({
    data: {
      technologyId: pythonTech.id,
      level: 'BEGINNER',
      order: 1,
    },
  });

  const fundamentalsModule = await prisma.module.create({
    data: {
      trackId: beginnerTrack.id,
      title: 'Python Fundamentals',
      description: 'Learn variables, data types, control flow, and loops in Python.',
      order: 1,
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: fundamentalsModule.id,
      title: 'Variables & Data Types',
      content: '# Variables & Data Types\nLearn how to declare variables and work with numbers, strings, and booleans in Python.',
      order: 1,
      estimatedMinutes: 10,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      moduleId: fundamentalsModule.id,
      title: 'Control Flow & Conditionals',
      content: '# Control Flow\nUnderstand if, elif, and else statements in Python.',
      order: 2,
      estimatedMinutes: 15,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      moduleId: fundamentalsModule.id,
      title: 'Loops & Iteration',
      content: '# Loops in Python\nLearn for loops and while loops to iterate over data sequences.',
      order: 3,
      estimatedMinutes: 15,
    },
  });

  // Seed Scoped Skills
  const skillVariables = await prisma.skill.upsert({
    where: { name_technologyId: { name: 'Python Variables', technologyId: pythonTech.id } },
    update: {},
    create: { name: 'Python Variables', technologyId: pythonTech.id },
  });

  const skillConditionals = await prisma.skill.upsert({
    where: { name_technologyId: { name: 'Python Conditionals', technologyId: pythonTech.id } },
    update: {},
    create: { name: 'Python Conditionals', technologyId: pythonTech.id },
  });

  const skillLoops = await prisma.skill.upsert({
    where: { name_technologyId: { name: 'Python Loops', technologyId: pythonTech.id } },
    update: {},
    create: { name: 'Python Loops', technologyId: pythonTech.id },
  });

  // Link Lessons to Skills via LessonSkill
  await prisma.lessonSkill.createMany({
    data: [
      { lessonId: lesson1.id, skillId: skillVariables.id },
      { lessonId: lesson2.id, skillId: skillConditionals.id },
      { lessonId: lesson3.id, skillId: skillLoops.id },
    ],
    skipDuplicates: true,
  });

  // Seed Practice Problem and Link to Skills via ProblemSkill
  const pythonProblem = await prisma.problem.upsert({
    where: { slug: 'python-sum-two-numbers' },
    update: {},
    create: {
      title: 'Sum of Two Numbers',
      slug: 'python-sum-two-numbers',
      description: 'Write a Python function that takes two integers as input and returns their sum.',
      constraints: '1 <= a, b <= 10^5',
      difficulty: 'EASY',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      tags: ['python', 'basics', 'math'],
    },
  });

  await prisma.problemSkill.createMany({
    data: [
      { problemId: pythonProblem.id, skillId: skillVariables.id },
      { problemId: pythonProblem.id, skillId: skillLoops.id },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeded Python Technology, Track, Module, 3 Lessons, 3 Skills, and Problem Skill Links.');
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
