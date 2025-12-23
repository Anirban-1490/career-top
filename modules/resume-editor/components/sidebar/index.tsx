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
import { Skills } from "./components/skills";
import { Education } from "./components/education";
import { Achievements } from "./components/achievements";

const sideBarContent = [
  PersonalInfo,
  SocialLinks,
  WorkInfo,
  Projects,
  Skills,
  Education,
  Achievements,
];

export function EditorSidebar() {
  const { handleSubmit, register, reset, watch, control } =
    useForm<ResumeOutputType>({
      resolver: zodResolver(resumeSchema),
    });

  return (
    <aside className="basis-[30%] sticky left-0 top-0 overflow-hidden">
      <div className=" h-full  flex flex-col gap-8 p-3 pb-7 overflow-auto">
        <form>
          <Accordion type="single" className="flex flex-col gap-5" collapsible>
            {sideBarContent.map((Content, index) => {
              return (
                <React.Fragment key={index}>
                  <Content control={control} />
                </React.Fragment>
              );
            })}
          </Accordion>
        </form>
      </div>
    </aside>
  );
}
