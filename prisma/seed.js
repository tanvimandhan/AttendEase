import { prisma } from '@/lib/prisma'


async function main() {
  await prisma.students.createMany({
    data: [
      { name: 'Tanvi', grade: 'A', address: 'Lucknow', contact: '9876543210' },
      { name: 'Ankit', grade: 'B', address: 'Delhi', contact: '9876543211' },
    ],
  });

  await prisma.grades.createMany({
    data: [
      { id: 1, grade: 'A' },
      { id: 2, grade: 'B' },
      { id: 3, grade: 'C' },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Database seeded');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    return prisma.$disconnect();
  });
