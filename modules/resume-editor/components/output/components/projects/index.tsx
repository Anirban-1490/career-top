import {
  IOutputSectionEntriesProps,
  OutputSection,
} from "../../../ui/output-section";

import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";

export function OutputProjects({ control }: IControlProps) {
  const projects = useWatch({
    control,
    name: "projects",
  });

  if (!projects || !projects.length) return null;

  const entries: IOutputSectionEntriesProps[] = projects.map((project) => {
    return {
      id: project.id,
      name: project.title,
      currentlyWorking: !!project.isCurrentlyWorking,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    };
  });

  return (
    <section id="work-experience">
      <OutputSection entries={entries} id="projects" heading="Projects" />
    </section>
  );
}
