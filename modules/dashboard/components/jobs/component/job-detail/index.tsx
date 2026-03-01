import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Banknote,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { JobData } from "ts-jobspy";
import { Parser } from "html-to-react";
import { extractBodyContent } from "@/lib/utils";

export function JobDetail({
  job,
  setShowJobDetail,
}: {
  setShowJobDetail: (value: string) => void;
  job: JobData | undefined;
}) {
  if (!job) return;

  return (
    <div className="w-[85%] max-xl:w-full h-full mx-auto flex flex-col gap-10 p-10 border border-input rounded-md">
      <Button
        onClick={(ev) => {
          ev.preventDefault();
          setShowJobDetail("");
        }}
        variant={"ghost"}
        className="w-fit px-0!"
      >
        <ArrowLeft />
        Back
      </Button>
      <div className="flex">
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
            {job.experienceRange && <Badge>{job.experienceRange}</Badge>}

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
      <div>
        <span
          className=" font-light text-sm"
          aria-label={`Posted on ${job.datePosted || "Unknown Date"}`}
        >
          Posted: {job.datePosted || "Unknown Date"}
        </span>
      </div>
      <div
        id="apply_link"
        className="mt-5 flex items-center gap-6 pb-10 border-b border-accent-neon-red"
      >
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
        {/* <Button onClick={(ev) => ev.stopPropagation()} variant={"ghost"}>
          <Bookmark /> Save
        </Button> */}
      </div>
      <div>
        <h2 className="text-md  font-bold mb-1">About {job.company}</h2>
        {job.companyDescription && <p>{job.companyDescription}</p>}
        {(job.companyUrl || job.companyUrlDirect) && (
          <Link
            className="flex gap-2 items-center w-fit mt-5 text-neon-red"
            href={(job.companyUrlDirect || job.companyUrl) ?? ""}
            rel="nofollow"
            target="_blank"
            onClick={(ev) => ev.stopPropagation()}
          >
            <SquareArrowOutUpRight className="size-4" />
            Website
          </Link>
        )}
      </div>
      {/* <div id="skills"></div> */}
      <div>
        <h2 className="text-md  font-bold mb-3">About the role</h2>
        {job.description && (
          <div>{Parser().parse(extractBodyContent(job.description))}</div>
        )}
      </div>
    </div>
  );
}
