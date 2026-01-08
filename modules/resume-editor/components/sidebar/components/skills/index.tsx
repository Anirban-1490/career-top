import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";
import { AddEntry } from "../ui/add-entry";
import { IControlProps } from "../../type";
import { DEFAULT_SKILL } from "./constant";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash } from "lucide-react";
import { InputWithControl } from "../ui/input-with-control";
import { Spinner } from "@/components/ui/spinner";

export function Skills({ control, isFormPending }: IControlProps) {
  const [editSkills, setEditSkills] = useState<Set<string>>(new Set());

  return (
    <AccordionItem value="skills">
      <AccordionTrigger>Skills</AccordionTrigger>{" "}
      <AccordionContent className=" flex flex-col gap-9">
        <AddEntry
          name="skills"
          defaultValue={DEFAULT_SKILL}
          control={control}
          noEntryHeader="No skills added"
          noEntryDescription="Please add some more skills for a better resume"
          parentProps={{
            className: "gap-2!",
          }}
          clean
        >
          {(skill, index) => {
            const isEditing = editSkills.has(skill.id);
            return (
              <div className=" border-b border-ring w-full py-3 flex justify-between">
                <InputWithControl
                  control={control}
                  name={`skills.${index}.label`}
                  parentProps={{ className: "w-full" }}
                  disabled={!isEditing}
                  className={`border-0 ${
                    isEditing ? "bg-secondary" : "bg-transparent"
                  }  disabled:opacity-100`}
                />
                <Button
                  onClick={(ev) => {
                    if (!isEditing) {
                      ev.preventDefault();
                    }

                    if (isFormPending) {
                      ev.stopPropagation();
                      return;
                    }

                    setEditSkills((prev) => {
                      const next = new Set(prev);
                      next.has(skill.id)
                        ? next.delete(skill.id)
                        : next.add(skill.id);
                      return next;
                    });
                  }}
                  variant={"ghost"}
                  disabled={isFormPending}
                >
                  {isFormPending && <Spinner />}
                  {!isFormPending && (isEditing ? <Check /> : <Edit />)}
                </Button>
                <Button
                  onClick={async (ev) => {
                    // ev.preventDefault();
                    // const filteredData = fields.filter(
                    //   (field) => field.id !== fieldContent.id
                    // );
                    // try {
                    //   await deleteResumeSection(
                    //     filteredData,
                    //     fieldContent.id,
                    //     id as string,
                    //     userId as string,
                    //     name
                    //   );
                    //   replace(filteredData);
                    //   toast.success(`Successfully removed entry.`);
                    // } catch (error) {
                    //   toast.error(`Failed to delete Entry. Please try again!`);
                    // }
                  }}
                  className=" hover:text-neon-red ml-auto"
                  variant={"ghost"}
                >
                  <Trash size={15} />
                </Button>
              </div>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
