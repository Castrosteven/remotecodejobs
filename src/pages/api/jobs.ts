import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { JobType, Prisma } from '@prisma/client'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const jobType = req.query?.jobType as JobType | undefined;

        const args:Prisma.JobFindManyArgs = {
            include: {
                company: true,
            },
        };

        if (jobType) {
            args.where = {
                jobType: jobType,
            };
        }

        const jobs = await prisma.job.findMany(args);

        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json(error);
    }
}
