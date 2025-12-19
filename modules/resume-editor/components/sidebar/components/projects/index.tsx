import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { IControlProps } from "../../type";

export function Projects({ control }: IControlProps) {
  return (
    <AccordionItem value="projects">
      <AccordionTrigger>Projects</AccordionTrigger>
      <AccordionContent className=" flex flex-col gap-9"></AccordionContent>
    </AccordionItem>
  );
}
