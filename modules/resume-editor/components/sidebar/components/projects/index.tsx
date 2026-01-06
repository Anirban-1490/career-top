import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IControlProps } from "../../type";
import { AddEntry } from "../ui/add-entry";
import { DEFAULT_PROJECTS } from "./constant";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { CheckboxWithControl } from "../ui/checkbox-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";

export function Projects({ control, ...props }: IControlProps) {
  return (
    <AccordionItem value="projects">
      <AccordionTrigger>Projects</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-9">
        <AddEntry
          name="projects"
          defaultValue={DEFAULT_PROJECTS}
          control={control}
          noEntryHeader="No projects added"
          noEntryDescription="Please add some more projects for a better resume"
          accordionTriggerContent={(project) => (
            <div className=" flex-grow">{project.title && project.title}</div>
          )}
          accordionTriggerDefaultContent="Project"
          {...props}
        >
          {(project, index) => {
            return (
              <>
                <InputWithControl
                  name={`projects.${index}.title`}
                  control={control}
                  labelContent={"Project Title"}
                />
                <InputWithControl
                  name={`projects.${index}.url`}
                  control={control}
                  labelContent={"Project URL"}
                />

                <DatepickerWithControl
                  name={`projects.${index}.startDate`}
                  control={control}
                  labelContent="Start Date"
                />
                <DatepickerWithControl
                  name={`projects.${index}.endDate`}
                  control={control}
                  labelContent="End Date"
                />

                <CheckboxWithControl
                  name={`projects.${index}.isCurrentlyWorking`}
                  control={control}
                  labelContent={"I am currently working on the project"}
                  id={`${project.id}`}
                />

                <WYSIWYGWithControl
                  labelContent="Desciption"
                  control={control}
                  name={`projects.${index}.description`}
                />
              </>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
