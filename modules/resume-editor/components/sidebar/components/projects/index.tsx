import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { IControlProps } from "../../type";
import { AddEntry } from "../ui/add-entry";
import { DEFAULT_PROJECTS } from "./constant";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { CheckboxWithControl } from "../ui/checkbox-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ContainerWithSubmit from "@/components/ui/container-with-submit";

export function Projects({ control, isFormPending }: IControlProps) {
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
        >
          {(fields) => {
            return (
              <Accordion
                className="border-0 flex flex-col gap-8"
                collapsible
                type="single"
              >
                {fields.map((project, index) => {
                  return (
                    <AccordionItem key={project.id} value={project.title}>
                      <AccordionTrigger>
                        {project.title + ` #${index + 1}`}
                      </AccordionTrigger>
                      <AccordionContent className="grid grid-cols-2 gap-y-8 gap-x-3">
                        <ContainerWithSubmit isFormPending={isFormPending}>
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
                              labelContent={
                                "I am currently working on the project"
                              }
                              id={`${project.id}`}
                            />

                            <WYSIWYGWithControl
                              labelContent="Desciption"
                              control={control}
                              name={`projects.${index}.description`}
                            />
                          </>
                        </ContainerWithSubmit>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
