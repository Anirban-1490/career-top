import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobsSearch from "@/modules/dashboard/components/jobs";
import { scrapeJobs } from "ts-jobspy";

export default async function Jobs() {
  // const jobData = await scrapeJobs({
  //   siteName: ["indeed", "linkedin"],
  //   location: "San Francisco, CA",
  //   resultsWanted: 10,
  //   hoursOld: 72,
  //   countryIndeed: "USA",
  // });
  // console.log(jobData);

  return (
    <section className="w-full h-full flex flex-col">
      <JobsSearch />
    </section>
  );
}
