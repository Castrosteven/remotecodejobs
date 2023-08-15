import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { JobType, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import util from "util";
import * as yup from "yup";

const schema = yup.object().shape({
  description: yup.string().required("description is required"),
  location: yup.string().required("location is required"),
  title: yup.string().required("title is required"),
  companyName: yup.string().required("companyName is required"),
  companyWebsite: yup.string().required("companyWebsite is required"),
  companyAddress: yup.string().required("companyAddress is required"),
  companySize: yup.string().required("companySize is required"),
  skip: yup.string().required("skip is required"),
  take: yup.string().required("take is required"),
});

const fetchResults = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobType = req.query?.jobType as JobType | undefined;
  const keyword = req.query?.keyword as string | undefined;
  const location = req.query?.location as string | undefined;
  const skip = req.query?.skip as string;
  const take = req.query?.take as string;

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

  res.status(200).json({ jobs: jobs, count: count.length });
};

const postNewJob = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  // const isValid = await schema.isValid(req.body);
  // if (!isValid) {
  //   return res.status(400).json({ error: "Validation error" });
  // }
  await schema.validate(req.body);
  const { description, location, title, companyName, companyWebsite } =
    req.body as {
      description: string;
      location: string;
      title: string;
      companyName: string;
      companyWebsite: string;
      companyAddress: string;
      companySize: string;
    };
  const session = await getServerSession(req, res, authOptions);
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
    return res.status(200).json(response);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    return await fetchResults(req, res);
  } else if (req.method === "POST") {
    return await postNewJob(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
