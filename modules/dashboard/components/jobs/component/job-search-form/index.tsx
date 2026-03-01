import SelectWithControl from "@/components/common/ui-control/select-with-control";
import { CheckboxWithControl } from "@/modules/resume-editor/components/sidebar/components/ui/checkbox-with-control";
import { InputWithControl } from "@/modules/resume-editor/components/sidebar/components/ui/input-with-control";

import { jobSearchSchema, JobSearchType } from "../../schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { removeUndefinedKeyValues } from "@/lib/utils";

export function JobSearchForm() {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(jobSearchSchema),
    defaultValues: {
      jobtype: "fulltime",
      isRemote: true,
    },
  });
  const country = watch("countryIndeed");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const params = removeUndefinedKeyValues(data);
        router.push(
          `/dashboard/jobs?${new URLSearchParams(params as Record<string, string>).toString()}`,
        );
        // refetch();
      })}
      className="w-full max-w-[55%] max-xl:max-w-full  mx-auto"
    >
      <div className="flex items-center mx-auto  rounded-md pr-2 gap-3">
        <InputWithControl<JobSearchType>
          control={control}
          name="searchTerm"
          placeholder="Job title, Keywards"
          className="h-[3rem] !text-base"
          containerProps={{ className: "flex-grow" }}
        />
        {/* <div className="h-7 w-0.5 bg-accent-neon-red"></div> */}
        <InputWithControl<JobSearchType>
          control={control}
          name="location"
          placeholder="City, State, Zip Code"
          className="h-[3rem] !text-base "
          containerProps={{ className: "basis-[40%]" }}
          disabled={!country}
        />
        <Button type="submit">Search</Button>
      </div>
      <div className="flex w-full gap-4 items-center mt-10">
        <SelectWithControl<JobSearchType>
          control={control}
          name="jobtype"
          options={[
            { value: "parttime", label: "Part-time" },
            { value: "fulltime", label: "Full-time" },
            { value: "contract", label: "Contract" },
            { value: "internship", label: "Internship" },
          ]}
          selectValueProps={{ placeholder: "Job Type" }}
          labelContent="Job Type"
          id="job_type"
          hidden
        />
        <SelectWithControl<JobSearchType>
          control={control}
          name="hoursOld"
          options={[
            { value: "24", label: "Last 24 hours" },
            { value: "48", label: "Last 48 hours" },
            { value: "72", label: "Last 72 hours" },
          ]}
          selectValueProps={{ placeholder: "Posted Within" }}
          labelContent="Posted Within"
          id="posted_within"
          hidden
        />
        <SelectWithControl<JobSearchType>
          control={control}
          name="countryIndeed"
          options={countries.map((country) => ({
            value: country,
            label: country,
          }))}
          labelContent="Country"
          id="country"
          selectValueProps={{ placeholder: "Country" }}
          hidden
        />
        <CheckboxWithControl<JobSearchType>
          control={control}
          name="isRemote"
          id="remote-only"
          labelContent="Remote"
        />
        <CheckboxWithControl<JobSearchType>
          control={control}
          name="easyApply"
          id="easy-apply"
          labelContent="Easy Apply"
          parentContainerProps={{ className: "w-full h-fit" }}
        />
      </div>
    </form>
  );
}
