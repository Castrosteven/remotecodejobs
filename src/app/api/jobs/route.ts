import { JobType } from "@prisma/client";
import { type NextRequest } from "next/server";
import { JobController } from "@/controllers/JobController";
const service = new JobController();

export async function GET(req: NextRequest) {
  const jobType = req.nextUrl.searchParams.get("jobType") as JobType;
  const keyword = req.nextUrl.searchParams.get("keyword") as string;
  const location = req.nextUrl.searchParams.get("location") as string;
  const skip = req.nextUrl.searchParams.get("skip") as string;
  const take = req.nextUrl.searchParams.get("take") as string;
  const data = await service.fetchResults({
    jobType,
    keyword,
    location,
    skip,
    take,
  });
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function POST(Request: NextRequest) {
  try {
    await service.init();
    const { description, location, title, companyName, companyWebsite } =
      await Request.json();
    const data = await service.createJobListing({
      description,
      location,
      title,
      companyName,
      companyWebsite,
    });
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    const Err = error as Error;
    return new Response(JSON.stringify(Err.message), {
      status: 403,
    });
  }
}
