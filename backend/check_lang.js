const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const langs = await prisma.language.findMany();
  console.log(JSON.stringify(langs, null, 2));
}

main().finally(() => prisma.$disconnect());
