"use client";
import fetcher from "@/utils/fetcher";
import { FormattedJobTypes } from "@/utils/formatters";
import { Company, Job, JobType } from "@prisma/client";
import { useState } from "react";

import useSWR from "swr";

const Home = () => {
  const [jobType, setJobType] = useState<JobType | string>("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const {
    data: jobs,
    mutate,
    error,
    isLoading,
  } = useSWR<Array<{ company: Company } & Job>>(
    `/api/jobs?${new URLSearchParams({
      jobType: jobType,
      keyword: keyword,
      location: location,
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
    <div className="h-screen flex flex-col gap-4 mt-4">
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
      <main className="flex gap-4 container mx-auto">
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
          <div className="p-4">
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
        <div className="border border-base-300 rounded-md p-4 flex flex-col gap-4 w-full">
          <div className="join-vertical md:join-horizontal join gap-5 md:gap-0 ">
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
          <div>
            <p>{jobs?.length} Job Resuls</p>
          </div>
          <div className="flex flex-col gap-4 ">
            {jobs &&
              jobs.map(
                (
                  {
                    company,
                    description,
                    jobType,
                    location,
                    title,
                    postedAt,
                    companyLogoUrl,
                  },
                  index
                ) => {
                  const { name } = company;
                  return (
                    <div
                      key={index}
                      className="flex flex-col p-4 gap-5 rounded-lg border-2 border-base-300 cursor-pointer hover:shadow-lg"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-5">
                          <div>
                            <img
                              src={companyLogoUrl || ""}
                              height={75}
                              width={75}
                              alt={name}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold">{title}</span>
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
                      {/* <div>{description}</div> */}
                      <div
                        className="prose  max-w-full"
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      ></div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
