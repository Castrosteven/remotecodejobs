import prisma from "../utils/prisma";
import type { Job, JobType, Prisma } from "@prisma/client";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import util from "util";

export class JobController {
  readonly prisma = prisma;
  public user: Session["user"];
  constructor() {}
  // Fetch user from token
  public async init() {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw Error("User Needs to be authenticated");
    } else {
      this.user = session.user;
    }
  }
  //Creates a slug from the title
  private createSlug({}: Job): string {
    return "";
  }
  // Create New Job Listing
  public async createJobListing({
    description,
    location,
    title,
    companyName,
    companyWebsite,
  }: {
    description: string;
    location: string;
    title: string;
    companyName: string;
    companyWebsite: string;
  }) {
    const email = this.user?.email;
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
    return await prisma.job.create({
      data,
    });
  }
  // Fetch Job Listings
  public async fetchResults({
    jobType,
    keyword,
    location,
    skip,
    take,
  }: {
    jobType: JobType;
    keyword: string;
    location: string;
    skip: string;
    take: string;
  }) {
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
  }
}
