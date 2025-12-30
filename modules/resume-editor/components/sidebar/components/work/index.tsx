import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IControlProps } from "../../type";
import { DEFAULT_WORK_EXPERIENCE } from "./constant";
import dynamic from "next/dynamic";
import { AddEntry } from "../ui/add-entry";
import { useWatch } from "react-hook-form";
import ContainerWithSubmit from "@/components/ui/container-with-submit";

const InputWithControl = dynamic(() =>
  import("../ui/input-with-control").then((value) => value.InputWithControl)
);

const DatepickerWithControl = dynamic(() =>
  import("../ui/datepicker-with-control").then(
    (value) => value.DatepickerWithControl
  )
);

const CheckboxWithControl = dynamic(() =>
  import("../ui/checkbox-with-control").then(
    (value) => value.CheckboxWithControl
  )
);
const WYSIWYGWithControl = dynamic(() =>
  import("../ui/wysiwyg-with-control").then((value) => value.WYSIWYGWithControl)
);

export function WorkInfo({ control, isFormPending }: IControlProps) {
  const watch = useWatch({
    control: control,
  });

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
                    <AccordionItem key={experience.id} value={experience.id}>
                      <AccordionTrigger className=" text-white">
                        {experience.role ? (
                          <div className="flex items-center gap-2">
                            {experience.role} -
                            <span className=" text-neon-red">
                              {experience.company}
                            </span>
                          </div>
                        ) : (
                          `Experience #${index}`
                        )}
                      </AccordionTrigger>
                      <AccordionContent className="grid grid-cols-2 gap-y-8 gap-x-3">
                        <ContainerWithSubmit isFormPending={isFormPending}>
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
                              disabled={Boolean(
                                watch.workExperience?.[index]?.currentlyWorking
                              )}
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
