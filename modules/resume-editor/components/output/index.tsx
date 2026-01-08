import React, { RefObject } from "react";

import { useFormContext } from "react-hook-form";

import { OutputPersonalInfo } from "./components/personal-info";
import { ResumeOutputType } from "../sidebar/schema";

import { OutputWorkExperience } from "./components/work";
import { OutputProjects } from "./components/projects";
import { OutputEducation } from "./components/education";
import { OutputAchievements } from "./components/achievements";
import { OutputSkills } from "./components/skills";

const outputSections = [
  OutputPersonalInfo,
  OutputWorkExperience,
  OutputSkills,
  OutputProjects,
  OutputEducation,
  OutputAchievements,
];

export function EditorOutput({
  contentRef,
}: {
  contentRef: RefObject<HTMLDivElement | null>;
}) {
  const { control } = useFormContext<ResumeOutputType>();

  return (
    <div className="flex-grow  h-full bg-secondary py-8 overflow-auto overflow-x-hidden">
      <div
        ref={contentRef}
        className=" w-full relative top-4  scale-[1.2]  origin-[center_top] pb-8"
      >
        <div className=" w-[8.27in] mx-auto min-h-[11.69in]  bg-white ">
          <div
            className="px-[12mm] py-[9mm] flex flex-col gap-6
          "
          >
            {outputSections.map((OutSection, index) => {
              return <OutSection key={index} control={control} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
