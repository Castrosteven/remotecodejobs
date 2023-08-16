import prisma from "@/utils/prisma";
import util from "util";
import { JobType, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { type NextRequest } from "next/server";

const fetchResults = async (req: NextRequest) => {
  const jobType = req.nextUrl.searchParams.get("jobType") as
    | JobType
    | undefined;
  const keyword = req.nextUrl.searchParams.get("keyword") as string;
  const location = req.nextUrl.searchParams.get("location") as string;
  const skip = req.nextUrl.searchParams.get("skip");
  const take = req.nextUrl.searchParams.get("take");

  const createFindManyArgs = ({
    jobType,
    keyword,
  }: {
    jobType?: JobType | undefined;
    keyword?: string | undefined;
    location?: string | undefined;
  }) => {
    let args: Prisma.JobFindManyArgs = {
      include: {
        company: true,
      },
      where: {},
    };
    if (jobType) {
      args.where!.jobType = jobType;
    }
    if (keyword) {
      args.where!.description = {
        contains: keyword,
        mode: "insensitive",
      };
    }
    if (location) {
      args.where!.location = {
        contains: location,
        mode: "insensitive",
      };
    }
    if (keyword && location) {
      args.where!.AND = {
        location: {
          contains: location,
          mode: "insensitive",
        },
      };
    }
    return args;
  };

  const args = createFindManyArgs({ jobType, keyword, location });
  console.log(util.inspect(args, false, null, true));

  const count = await prisma.job.findMany(args);
  console.log(count.length);
  const jobs = await prisma.job.findMany({
    ...args,
    skip: Number(skip),
    take: Number(take),
  });
  return {
    jobs: jobs,
    count: count.length,
  };
};

const postNewJob = async (req: NextRequest) => {
  const { description, location, title, companyName, companyWebsite } =
    await req.json();
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session.user!.email;
    const data: Prisma.JobCreateInput = {
      title,
      location,
      description,
      employer: {
        connect: {
          email: email!,
        },
      },
      company: {
        create: {
          description: "My Company",
          name: companyName,
          website: companyWebsite,
        },
      },
    };
    const response = await prisma.job.create({
      data,
    });
    return response;
  }
};
export async function GET(Request: NextRequest) {
  const data = await fetchResults(Request);
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function POST(Request: NextRequest) {
  const data = await postNewJob(Request);
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
