import React from "react";
import { ResumeOutputType } from "../../../sidebar/schema";
import {
  IOutputSectionEntriesProps,
  OutputSection,
} from "../../../ui/output-section";
import { getDate } from "../../lib/get-date";
import { Parser } from "html-to-react";
import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";

export function OutputWorkExperience({ control }: IControlProps) {
  const workExperience = useWatch({
    control,
    name: "workExperience",
  });

  if (!workExperience || !workExperience.length) return null;

  const entries: IOutputSectionEntriesProps[] = workExperience.map((exp) => {
    return {
      id: exp.id,
      org: exp.company,
      name: exp.role,
      currentlyWorking: !!exp.currentlyWorking,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.isRemote ? "Remote" : exp.location,
    };
  });

  return (
    <section id="work-experience">
      <OutputSection
        entries={entries}
        id="work-experience"
        heading="Experience"
      />
    </section>
  );
}
