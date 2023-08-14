import prisma from "@/utils/prisma";
export default async function Page({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      company: true,
    },
  });
  if (job) {
    return (
      <div className="container mx-auto">
        <div className="card-body ">
          <span className="card-title"> {job.title}</span>
          <span className="text-sm">{job.company.name}</span>
          <div className="divider"></div>
          <div
            className="prose  max-w-full p-5 text-left"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></div>
        </div>
      </div>
    );
  }
  return <div>No Content</div>;
}
