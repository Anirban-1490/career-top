import {
  IOutputSectionEntriesProps,
  OutputSection,
} from "../../../ui/output-section";

import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";

export function OutputEducation({ control }: IControlProps) {
  const educations = useWatch({
    control,
    name: "education",
  });

  if (!educations || !educations.length) return null;

  const entries: IOutputSectionEntriesProps[] = educations.map((edu) => {
    return {
      id: edu.id,
      name: edu.degree,
      org: edu.institute,
      currentlyWorking: !!edu.isCurrentlyStudying,
      description: edu.description,
      startDate: edu.startDate,
      endDate: edu.endDate,
      location: edu.location,
    };
  });

  return (
    <section id="education">
      <OutputSection entries={entries} id="education" heading="Education" />
    </section>
  );
}
