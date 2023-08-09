// This is a seed file to generate mock data for your Prisma schema

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create mock data for users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      emailVerified: new Date(),
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "APPLICANT",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      emailVerified: new Date(),
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "EMPLOYER",
    },
  });

  // Create mock data for companies
  const company1 = await prisma.company.create({
    data: {
      name: "ABC Corp",
      description: "A tech company",
      website: "https://www.abccorp.com",
    },
  });

  // Create mock data for jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Software Engineer",
      description: "Develop software applications",
      company: { connect: { id: company1.id } },
      location: "Remote",
      minSalary: 60000,
      maxSalary: 100000,
      employer: { connect: { id: user2.id } },
    },
  });

  // Create mock data for accounts
  const account1 = await prisma.account.create({
    data: {
      userId: user1.id,
      type: "oauth",
      provider: "Google",
      providerAccountId: "google123",
    },
  });

  console.log("Mock data generated.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
