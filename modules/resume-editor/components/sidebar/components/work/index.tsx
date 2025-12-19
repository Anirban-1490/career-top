import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IControlProps } from "../../type";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { DEFAULT_WORK_EXPERIENCE } from "./constant";

import dynamic from "next/dynamic";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { CheckboxWithControl } from "../ui/checkbox-with-control";
import { AddEntry } from "../ui/add-entry";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";

const DynamicInputWithControl = dynamic(() =>
  import("../ui/input-with-control").then((value) => value.InputWithControl)
);

export function WorkInfo({ control }: IControlProps) {
  return (
    <AccordionItem value="work-info">
      <AccordionTrigger>Work Experience</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-9">
        <AddEntry
          name="workExperience"
          defaultValue={DEFAULT_WORK_EXPERIENCE}
          control={control}
          noEntryHeader="No work experience added"
          noEntryDescription="Please add relevant work experience of your career for a better resume"
        >
          {(fields) => {
            return (
              <Accordion
                className="border-0 flex flex-col gap-8"
                collapsible
                type="single"
              >
                {fields.map((experience, index) => {
                  return (
                    <AccordionItem
                      key={experience.id}
                      value={experience.company}
                    >
                      <AccordionTrigger className=" text-white">
                        <div className="flex items-center gap-2">
                          {experience.role} -
                          <span className=" text-neon-red">
                            {experience.company}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="grid grid-cols-2 gap-y-8 gap-x-3">
                        <InputWithControl
                          name={`workExperience.${index}.role`}
                          control={control}
                          labelContent={"Job Title"}
                        />
                        <InputWithControl
                          name={`workExperience.${index}.company`}
                          control={control}
                          labelContent={"Company Name"}
                        />
                        <InputWithControl
                          name={`workExperience.${index}.location`}
                          control={control}
                          labelContent={"Location"}
                        />
                        <DatepickerWithControl
                          name={`workExperience.${index}.startDate`}
                          control={control}
                          labelContent="Start Date"
                        />
                        <DatepickerWithControl
                          name={`workExperience.${index}.endDate`}
                          control={control}
                          labelContent="End Date"
                        />

                        <CheckboxWithControl
                          name={`workExperience.${index}.isRemote`}
                          control={control}
                          labelContent={"Remote Position"}
                          id="remote"
                        />

                        <CheckboxWithControl
                          name={`workExperience.${index}.currentlyWorking`}
                          control={control}
                          labelContent={"I am currently working here"}
                          id="working"
                        />
                        <WYSIWYGWithControl
                          labelContent="Desciption"
                          control={control}
                          name="workExperience.0.description"
                        />

                        <Button
                          onClick={(ev) => {}}
                          className=" w-full capitalize  text-sm col-span-2"
                        >
                          <Check /> done
                        </Button>
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
