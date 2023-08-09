import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { JobType, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import util from "util";

const fetchResults = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobType = req.query?.jobType as JobType | undefined;
  const keyword = req.query?.keyword as string | undefined;
  const location = req.query?.location as string | undefined;

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
      };
    }
    if (location) {
      args.where!.location = {
        contains: location,
      };
    }
    if (keyword && location) {
      args.where!.AND = {
        location: {
          contains: location,
        },
      };
    }
    return args;
  };

  const args = createFindManyArgs({ jobType, keyword, location });
  console.log(util.inspect(args, false, null, true));

  const jobs = await prisma.job.findMany(args);
  res.status(200).json(jobs);
};

const postNewJob = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, location, title } = req.body as {
    description: string;
    location: string;
    title: string;
  };
  if (description && location && title) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      const email = session.user!.email;
      const userAccount = await prisma.user.findUnique({
        where: {
          email: email!,
        },
        include: {},
      });

      res.status(200).json({ ok: true });
    }
    res.status(401).json({ error: "No User" });
    // const data: Prisma.JobCreateInput = {
    //   title,
    //   location,
    //   description,
    // };
    // TODO: Fetch Company and employer info from user
  } else {
    res.status(500).json({
      error: "missing or empty fields. [Need description, location, title]",
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (req.method === "GET") {
      return await fetchResults(req, res);
    }
    if (req.method === "POST") {
      return await postNewJob(req, res);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
}
