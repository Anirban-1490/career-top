"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ResumeOutputType, resumeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfo } from "./components/personal-info";
import { Accordion } from "@/components/ui/accordion";
import { WorkInfo } from "./components/work";
import { SocialLinks } from "./components/social-links";
import { Projects } from "./components/projects";

export function EditorSidebar() {
  const { handleSubmit, register, reset, watch, control } =
    useForm<ResumeOutputType>({
      resolver: zodResolver(resumeSchema),
    });
  console.log(watch());

  return (
    <aside className="basis-[30%] sticky left-0 top-0 overflow-hidden">
      <div className=" h-full  flex flex-col gap-8 p-3 pb-7 overflow-auto">
        <form>
          <Accordion type="single" className="flex flex-col gap-5" collapsible>
            <PersonalInfo control={control} />
            <SocialLinks control={control} />
            <WorkInfo control={control} />
            <Projects control={control} />
          </Accordion>
        </form>
      </div>
    </aside>
  );
}
