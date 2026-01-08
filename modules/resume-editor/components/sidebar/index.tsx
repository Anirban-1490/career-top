"use client";

import React, { JSX } from "react";

import { PersonalInfo } from "./components/personal-info";
import { WorkInfo } from "./components/work";
import { SocialLinks } from "./components/social-links";
import { Projects } from "./components/projects";
import { Skills } from "./components/skills";
import { Education } from "./components/education";
import { Achievements } from "./components/achievements";
import { IControlProps } from "./type";

const sideBarContent = [
  PersonalInfo,
  SocialLinks,
  WorkInfo,
  Projects,
  Skills,
  Education,
  Achievements,
];

interface IEditorSidebarProps {
  children: (
    sideBarContent: (({
      control,
      isFormPending,
      id,
      userId,
    }: IControlProps) => JSX.Element)[]
  ) => React.ReactNode;
}

export function EditorSidebar({ children }: IEditorSidebarProps) {
  return (
    <aside className="basis-[30%] sticky left-0 top-0 overflow-hidden ">
      <div className=" h-full  flex flex-col gap-8 p-3 pb-7 overflow-auto editor_sidebar__inner">
        {children(sideBarContent)}
      </div>
    </aside>
  );
}
