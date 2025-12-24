"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { IJobsResponseProps } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ExternalLink, Search } from "lucide-react";
import Image from "next/image";
import { use } from "react";

interface IHomeSearchJobProps {
  jobs: Promise<AxiosResponse<IJobsResponseProps>>;
}

const SearchJob = () => {
  // const {
  //   data: jobsData,
  //   isLoading,
  //   error,
  //   isError,
  // } = useQuery({
  //   queryKey: ["jobs-data"],
  //   queryFn: () =>
  //     axios.get<IJobsResponseProps>("http://localhost:3000/api/jobs"),
  //   select(data) {
  //     return data.data;
  //   },
  //   retry: 1,
  // });

  return (
    <div className="w-[min(100%,40rem)] flex flex-col items-center">
      <div className=" w-full relative">
        <Input
          type="text"
          className="w-full h-[3.5rem] !text-md rounded-bl-none rounded-br-none shadow-none border border-background/10"
        />
        <Search className="w-[4rem] absolute right-2 top-[50%] translate-y-[-50%] text-background" />
      </div>
      <div className=" w-full bg-foreground h-[20rem] rounded-bl-md rounded-br-md">
        {/* {isLoading && !isError && (
          <Spinner className=" text-background text-5xl" />
        )} */}

        {/* {jobsData &&
          !isLoading &&
          jobsData.data?.slice(0, 3).map((job) => {
            return (
              <div key={job.job_id} className=" h-fit">
                <div className="flex h-[5rem] items-center gap-5 p-2 text-background">
                  <div className=" relative basis-[min(6rem,8rem)] h-full">
                    <Image
                      src={job.employer_logo || "/placeholder-company-logo.svg"}
                      alt={job.job_title}
                      width={50}
                      height={50}
                      className=" w-full h-full absolute object-contain aspect-square"
                    />
                  </div>
                  <div className=" flex-1">
                    <h3 className=" font-semibold">{job.job_title}</h3>
                    <p className=" font-light text-sm">{job.employer_name}</p>
                    <p className=" font-normal text-sm">{job.job_location}</p>
                  </div>
                  <div>
                    <Button className=" uppercase">
                      Apply Now <ExternalLink />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default SearchJob;
