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
import { InputWithControl } from "../ui/input-with-control";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import ContainerWithSubmit from "@/components/ui/container-with-submit";

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

export function PersonalInfo({ control, isFormPending }: IControlProps) {
  return (
    <AccordionItem value="personal-info">
      <AccordionTrigger>Personal Information</AccordionTrigger>
      <AccordionContent className=" grid grid-cols-2 gap-3 gap-y-6">
        <ContainerWithSubmit isFormPending={isFormPending}>
          {personalInformationFields.map((field) => {
            return (
              <InputWithControl
                key={field.id}
                labelContent={field.labelContent}
                name={field.name as Path<ResumeOutputType>}
                control={control}
                type={field.type}
              />
            );
          })}
        </ContainerWithSubmit>
      </AccordionContent>
    </AccordionItem>
  );
}
