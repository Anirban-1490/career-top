import React from "react";
import { IControlProps } from "../../type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEntry } from "../ui/add-entry";
import { DEFAULT_ACHIEVEMENTS } from "./constant";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Achievements({ control }: IControlProps) {
  return (
    <AccordionItem value="achievements">
      <AccordionTrigger>Achievements</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-9">
        <AddEntry
          name="achievements"
          defaultValue={DEFAULT_ACHIEVEMENTS}
          control={control}
          noEntryHeader="No achievements added"
          noEntryDescription="Please add some more achievements for a better resume"
        >
          {(fields) => {
            return (
              <Accordion
                className="border-0 flex flex-col gap-8"
                collapsible
                type="single"
              >
                {fields.map((achiv, index) => {
                  return (
                    <AccordionItem key={achiv.id} value={achiv.id}>
                      <AccordionTrigger>
                        {achiv.achievementName
                          ? achiv.achievementName
                          : `Achievements #${index + 1}`}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-8">
                        <InputWithControl
                          name={`achievements.${index}.achievementName`}
                          control={control}
                          labelContent={"Achievement Name"}
                        />
                        <InputWithControl
                          name={`achievements.${index}.issuerName`}
                          control={control}
                          labelContent={"Issuer Name"}
                        />
                        <InputWithControl
                          name={`achievements.${index}.url`}
                          control={control}
                          labelContent={"URL"}
                        />
                        <DatepickerWithControl
                          name={`achievements.${index}.date`}
                          control={control}
                          labelContent="Date"
                        />
                        <WYSIWYGWithControl
                          labelContent="Description"
                          control={control}
                          name={`achievements.${index}.description`}
                        />
                        <Button
                          type="submit"
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
