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

export function SocialLinks({ control }: IControlProps) {
  return (
    <AccordionItem value="socials">
      <AccordionTrigger>Website & Social Links</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-6">
        <InputWithControl
          labelContent="Github"
          name="socialLinks.github"
          control={control}
        />
        <InputWithControl
          labelContent="Linkedin"
          name="socialLinks.linkedin"
          control={control}
        />
        <InputWithControl
          labelContent="Twitter"
          name="socialLinks.twitter"
          control={control}
        />
        <InputWithControl
          labelContent="Website"
          name="socialLinks.website"
          control={control}
        />
        <Button
          onClick={(ev) => {
            ev.preventDefault();
          }}
          className=" w-full capitalize  text-sm col-span-2"
        >
          <Check /> done
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
