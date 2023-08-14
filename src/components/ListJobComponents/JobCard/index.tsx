import { IJob } from "@/components/Table";
import { FormattedJobTypes } from "@/utils/formatters";
import Link from "next/link";
const JobCard = ({
  companyLogoUrl,
  company,
  jobType,
  title,
  location,
  postedAt,
  id,
}: IJob) => {
  const { name } = company;

  return (
    <Link
      href={`/listing/${id}`}
      className="flex flex-col p-4 gap-5 rounded-lg border-2 border-base-300  hover:shadow-lg  bg-white cursor-pointer "
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div>
            <img src={companyLogoUrl || ""} height={75} width={75} alt={name} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">
              {id} {title}
            </span>
            <div>
              {name} - {FormattedJobTypes[jobType]}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>{location}</div>
          <div className="flex gap-2 items-center text-sm">
            <span className=" ">Posted</span>
            {new Date(postedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default JobCard;
