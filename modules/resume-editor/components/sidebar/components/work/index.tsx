import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IControlProps } from "../../type";
import { DEFAULT_WORK_EXPERIENCE } from "./constant";

import { AddEntry } from "../ui/add-entry";
import { useWatch } from "react-hook-form";

import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { CheckboxWithControl } from "../ui/checkbox-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";

export function WorkInfo({ control, ...props }: IControlProps) {
  // const workExperience = useWatch({
  //   control: control,
  //   name: "workExperience",
  // });

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
          accordionTriggerDefaultContent="Experience"
          accordionTriggerContent={(field) => {
            return (
              field.role && (
                <>
                  {field.role} -
                  <span className=" text-neon-red">{field.company}</span>
                </>
              )
            );
          }}
          {...props}
        >
          {(experience, index) => {
            return (
              <>
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
                  disabled={Boolean(experience?.currentlyWorking)}
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
                  id={experience.id}
                />
                <WYSIWYGWithControl
                  labelContent="Desciption"
                  control={control}
                  name={`workExperience.${index}.description`}
                />
              </>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
