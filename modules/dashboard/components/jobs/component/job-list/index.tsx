import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { Badge } from "@/components/ui/badge";

import { Banknote, MapPin, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { JobData } from "ts-jobspy";
import {} from "react-spring";

export function JobList({
  isFetching,
  data,
  setShowJobDetail,
}: {
  isFetching: boolean;
  data: JobData[] | undefined;
  setShowJobDetail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-grow mt-10">
      {isFetching && <ContainerWithSpinner />}
      {!isFetching && data && (
        <ul className="h-full w-[60%] max-2xl:w-full mx-auto flex flex-col gap-8">
          {data.map((job) => {
            return (
              <li
                key={job.id}
                onClick={(ev) => {
                  setShowJobDetail(job.id as string);
                }}
                className=" border border-input rounded-md list-none p-6 cursor-pointer hover:scale-102 transition duration-200 ease-in-out"
              >
                <div className=" flex">
                  <div className=" flex flex-col gap-3">
                    <h3 className=" font-bold">{job.title}</h3>
                    <span
                      className=" font-light"
                      aria-label={job.company || "Unknown Company"}
                    >
                      {job.company ? job.company : "Unknown Company"}
                    </span>
                    <div className="flex gap-3 mt-1">
                      {job.location && (
                        <Badge>
                          <MapPin />
                          {job.location}
                        </Badge>
                      )}
                      <Badge>{job.isRemote ? "Remote" : "On-site"}</Badge>
                      {job.experienceRange && (
                        <Badge>{job.experienceRange}</Badge>
                      )}

                      <Badge className=" capitalize">
                        <Banknote className=" text-green-700" />
                        {job.currency && job.minAmount && job.maxAmount
                          ? `${job.minAmount.toLocaleString()}-${job.maxAmount.toLocaleString()} /${job.interval} (${job.currency})`
                          : "Not Disclosed"}
                      </Badge>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <img
                      width={50}
                      height={50}
                      src={job.companyLogo ?? "/placeholder-company-logo.svg"}
                      alt={job.company ?? "company-logo"}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-12 flex items-center justify-between gap-6">
                  <span
                    className=" font-light text-sm"
                    aria-label={`Posted on ${job.datePosted || "Unknown Date"}`}
                  >
                    Posted: {job.datePosted || "Unknown Date"}
                  </span>
                  {/* <Button
                    onClick={(ev) => ev.stopPropagation()}
                    className="ml-auto"
                    variant={"ghost"}
                  >
                    <Bookmark /> Save
                  </Button> */}
                  <Link
                    className="flex gap-2 items-center py-2 px-3 bg-neon-red w-fit rounded-md "
                    href={job.jobUrl}
                    rel="nofollow"
                    target="_blank"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <SquareArrowOutUpRight className="size-4" />
                    Apply
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
