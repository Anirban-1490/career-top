import React from "react";
import { Controller, Path, UseFormRegister } from "react-hook-form";
import { ResumeOutputType } from "../../schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { IControlProps } from "../../type";

export const personalInformationFields = [
  {
    id: "firstName",
    name: "personalInformation.firstName",
    labelContent: "First Name",
  },
  {
    id: "lastName",
    name: "personalInformation.lastName",
    labelContent: "Last Name",
  },
  {
    id: "email",
    name: "personalInformation.email",
    labelContent: "Email Address",
    type: "email",
    parentProps: {
      className: "col-span-2",
    },
  },
  {
    id: "phone",
    name: "personalInformation.phone",
    labelContent: "Phone Number",
    parentProps: {
      className: "col-span-2",
    },
  },
  {
    id: "location",
    name: "personalInformation.location",
    labelContent: "Address",
    parentProps: {
      className: "col-span-2",
    },
  },
];

export function PersonalInfo({ control }: IControlProps) {
  return (
    <AccordionItem value="personal-info">
      <AccordionTrigger>Personal Information</AccordionTrigger>
      <AccordionContent className=" grid grid-cols-2 gap-3 gap-y-6">
        {personalInformationFields.map((field) => {
          return (
            <Controller
              name={field.name as Path<ResumeOutputType>}
              key={field.id}
              control={control}
              render={() => {
                return (
                  <Input
                    parentProps={{
                      className: field.parentProps?.className || "",
                    }}
                    type={field.type}
                    labelContent={field.labelContent}
                    className="border border-input-outline bg-background"
                  />
                );
              }}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}
