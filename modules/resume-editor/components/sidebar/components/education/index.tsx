import React from "react";
import { IControlProps } from "../../type";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEntry } from "../ui/add-entry";
import { DEFAULT_EDUCATION } from "./constant";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { CheckboxWithControl } from "../ui/checkbox-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";

export function Education({ control, ...props }: IControlProps) {
  return (
    <AccordionItem value="education">
      <AccordionTrigger>Education</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-9">
        <AddEntry
          name="education"
          defaultValue={DEFAULT_EDUCATION}
          control={control}
          noEntryHeader="No education added"
          noEntryDescription="Please add some more education for a better resume"
          accordionTriggerContent={(field) => (
            <div className=" flex-grow">{field.degree && field.degree}</div>
          )}
          accordionTriggerDefaultContent="Education"
          {...props}
        >
          {(education, index) => {
            return (
              <>
                <InputWithControl
                  name={`education.${index}.degree`}
                  control={control}
                  labelContent={"Degree"}
                />
                <InputWithControl
                  name={`education.${index}.institute`}
                  control={control}
                  labelContent={"Institute"}
                />
                <InputWithControl
                  name={`education.${index}.location`}
                  control={control}
                  labelContent={"Location"}
                />

                <DatepickerWithControl
                  name={`education.${index}.startDate`}
                  control={control}
                  labelContent="Start Date"
                />
                <DatepickerWithControl
                  name={`education.${index}.endDate`}
                  control={control}
                  labelContent="End Date"
                />

                <CheckboxWithControl
                  name={`education.${index}.isCurrentlyStudying`}
                  control={control}
                  labelContent={"I am currently studying in this institute"}
                  id={`${education.id}`}
                />

                <WYSIWYGWithControl
                  labelContent="Description"
                  control={control}
                  name={`education.${index}.description`}
                />
              </>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
