"use client";

import { useJobs } from "./hooks/use-jobs";

import { useSearchParams } from "next/navigation";

import { JobList } from "./component/job-list";
import { useState } from "react";
import { JobDetail } from "./component/job-detail";
import { JobSearchForm } from "./component/job-search-form";
export default function JobsSearch() {
  const params = useSearchParams();
  const [showJobDetail, setShowJobDetail] = useState("");
  const urlObject = Object.fromEntries(params.entries()) as Record<
    string,
    unknown
  >;

  const { data, isFetching } = useJobs({
    jobtype: "fulltime",
    isRemote: "true",

    ...urlObject,
  });

  return (
    <div className="h-full flex flex-col mt-10">
      {!showJobDetail ? (
        <>
          <JobSearchForm />
          <JobList
            setShowJobDetail={setShowJobDetail}
            isFetching={isFetching}
            data={data}
          />
        </>
      ) : (
        <JobDetail
          setShowJobDetail={setShowJobDetail}
          job={data?.find((job) => job.id === showJobDetail)}
        />
      )}
    </div>
  );
}
