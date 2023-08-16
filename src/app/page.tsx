"use client";
import Table from "@/components/Table";
import fetcher from "@/utils/fetcher";
import { FormattedJobTypes } from "@/utils/formatters";
import { Company, Job, JobType } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobType, setJobType] = useState<JobType | string>("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const { data: jobs } = useSWR<{
    jobs: Array<{ company: Company } & Job>;
    count: number;
  }>(
    `/api/jobs?${new URLSearchParams({
      jobType: jobType,
      keyword: keyword,
      location: location,
      skip: `${currentPage === 1 ? 0 : (currentPage - 1) * 3}`,
      take: "3",
    })}`,
    fetcher
  );

  const clearItems = () => {
    setJobType("");
  };

  const JobTypeclickHandler = (job: string) => {
    if (jobType === job) {
      setJobType("");
    } else {
      setJobType(job);
    }
  };
  return (
    <div className="h-full flex flex-col gap-4 mt-5 mb-5">
      {/* Top Section */}
      <div className=" flex items-center ">
        <div className="flex flex-col container mx-auto gap-4">
          <div className="md:flex justify-between">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Find Your Dream Job
            </h1>
          </div>
          <p className="text-sm font-light text-center md:text-left">
            Looking for Jobs? Browse our latest job openings to view & apply to
            the best jobs today!
          </p>
        </div>
      </div>
      {/* Main Section */}
      <main className="flex gap-4 container mx-auto ">
        {/* Left Filter Section */}
        <div className="border border-base-300 rounded-md  hidden md:flex flex-col w-96 min-w-min">
          <div className="flex justify-between items-center  border-b border-base-300 p-4">
            <div>Filter</div>
            <div>
              <button className="btn btn-ghost" onClick={clearItems}>
                Clear All
              </button>
            </div>
          </div>
          <div className="p-4 text-left">
            {/* Job Type */}
            <p className="font-semibold">Job Type</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(JobType).map((job, index) => {
                return (
                  <div key={index} className="form-control">
                    <label className="label flex items-center justify-start gap-2">
                      <input
                        type="checkbox"
                        value={jobType}
                        checked={jobType === job}
                        className="checkbox"
                        onChange={() => {
                          JobTypeclickHandler(job);
                        }}
                      />
                      <span className="label-text">
                        {FormattedJobTypes[job]}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Jobs Section */}
        <div className="border border-base-300 rounded-md p-4 flex flex-col gap-4 w-full h-full ">
          <div className="join-vertical md:join-horizontal join gap-5 md:gap-0 pl-4 p-4 ">
            <input
              className="input input-bordered join-item w-full "
              placeholder="Search Job Title or Keyword"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <input
              className="input input-bordered join-item w-full "
              placeholder="Country or timezone"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <button className="btn">Search</button>
          </div>
          <div className="divider md:hidden"></div>
          <div className="flex items-start">
            <p>{jobs?.count} Job Resuls</p>
          </div>
          <div className="flex flex-col gap-4 h-full overflow-y-scroll w-full ">
            {jobs?.jobs && (
              <Table
                count={jobs.count}
                jobs={jobs.jobs}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
