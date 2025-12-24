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
import { Check, Edit } from "lucide-react";
import { InputWithControl } from "../ui/input-with-control";

export function Skills({ control }: IControlProps) {
  const [editSkills, setEditSkills] = useState<Set<string>>(new Set());
  console.log(editSkills);

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
        >
          {(fields) => {
            return (
              <div className="">
                {fields.map((skill, index) => {
                  const isEditing = editSkills.has(skill.id);
                  return (
                    <div
                      className=" border-b border-ring w-full py-5 flex justify-between"
                      key={skill.id}
                    >
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
                          ev.preventDefault();

                          setEditSkills((prev) => {
                            const next = new Set(prev);
                            next.has(skill.id)
                              ? next.delete(skill.id)
                              : next.add(skill.id);
                            return next;
                          });
                        }}
                        variant={"ghost"}
                      >
                        {isEditing ? <Check /> : <Edit />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </AddEntry>
      </AccordionContent>
    </AccordionItem>
  );
}
