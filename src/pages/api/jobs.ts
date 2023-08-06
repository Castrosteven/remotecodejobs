import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { JobType, Prisma } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
    console.log(args);
    const jobs = await prisma.job.findMany(args);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
}
