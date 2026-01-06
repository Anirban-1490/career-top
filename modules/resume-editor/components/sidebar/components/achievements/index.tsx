import { IControlProps } from "../../type";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEntry } from "../ui/add-entry";
import { DEFAULT_ACHIEVEMENTS } from "./constant";
import { InputWithControl } from "../ui/input-with-control";
import { DatepickerWithControl } from "../ui/datepicker-with-control";
import { WYSIWYGWithControl } from "../ui/wysiwyg-with-control";

export function Achievements({ control, ...props }: IControlProps) {
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
          accordionTriggerContent={(achiv) => (
            <div className=" flex-grow">
              {achiv.achievementName && achiv.achievementName}
            </div>
          )}
          accordionTriggerDefaultContent="Achievement"
          {...props}
        >
          {(achiv, index) => {
            return (
              <>
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
              </>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
