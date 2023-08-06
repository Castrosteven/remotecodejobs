import { JobType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const user1 = await prisma.user.create({
    data: {
      username: 'employer1',
      email: 'employer1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'EMPLOYER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'applicant1',
      email: 'applicant1@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'APPLICANT',
    },
  });

  const company1 = await prisma.company.create({
    data: {
      name: 'Tech Innovators',
      description: 'A leading technology company focused on innovation.',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Marketing Solutions',
      description: 'A creative marketing agency specializing in digital campaigns.',
    },
  });

  const jobsToCreate = [
    {
      title: 'Frontend Developer',
      description: 'Looking for a skilled frontend developer to create responsive and user-friendly interfaces.',
      location: 'San Francisco, CA',
      minSalary: 70000,
      maxSalary: 100000,
      jobType: JobType['FULL_TIME'],
      companyId: company1.id,
      employerId: user1.id,
    },
    {
      title: 'Marketing Intern',
      description: 'Join our marketing team and gain hands-on experience in digital marketing strategies.',
      location: 'Los Angeles, CA',
      minSalary: 15000,
      maxSalary: 25000,
      jobType: JobType['PART_TIME'],
      companyId: company2.id,
      employerId: user1.id,
    },
  ];

  for (const jobData of jobsToCreate) {
    await prisma.job.create({
      data: jobData,
    });
  }

  console.log('Mock data seeded successfully.');

  prisma.$disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
