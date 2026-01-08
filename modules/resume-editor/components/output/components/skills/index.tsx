import {
  IOutputSectionEntriesProps,
  OutputSection,
} from "../../../ui/output-section";

import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";
import React from "react";
import { Dot } from "lucide-react";

export function OutputSkills({ control }: IControlProps) {
  const skills = useWatch({
    control,
    name: "skills",
  });

  if (!skills || !skills.length) return null;

  return (
    <section id="work-experience">
      <OutputSection id="skills" heading="Skills">
        <div className="flex items-center flex-wrap text-xs text-background">
          {skills.map((skill, index) => {
            const hasDivider = index !== 0;
            return (
              <React.Fragment key={skill.id}>
                {hasDivider ? <Dot /> : null}
                <span key={skill.id}>{skill.label}</span>
              </React.Fragment>
            );
          })}
        </div>
      </OutputSection>
    </section>
  );
}
