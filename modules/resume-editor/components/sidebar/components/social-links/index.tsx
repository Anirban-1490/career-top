import React from "react";
import { IControlProps } from "../../type";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InputWithControl } from "../ui/input-with-control";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Path } from "react-hook-form";
import { ResumeOutputType } from "../../schema";
import ContainerWithSubmit from "@/components/ui/container-with-submit";
export const socialLinkFields = [
  {
    labelContent: "Github",
    name: "personalInformation.github",
  },
  {
    labelContent: "Linkedin",
    name: "personalInformation.linkedin",
  },
  {
    labelContent: "Twitter",
    name: "personalInformation.twitter",
  },
  {
    labelContent: "Website",
    name: "personalInformation.website",
  },
];
export function SocialLinks({ control, isFormPending }: IControlProps) {
  return (
    <AccordionItem value="socials">
      <AccordionTrigger>Website & Social Links</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-6">
        <ContainerWithSubmit isFormPending={isFormPending}>
          {socialLinkFields.map((social, index) => {
            return (
              <InputWithControl
                key={index}
                labelContent={social.labelContent}
                name={social.name as Path<ResumeOutputType>}
                control={control}
              />
            );
          })}
        </ContainerWithSubmit>
      </AccordionContent>
    </AccordionItem>
  );
}
