import {
  IOutputSectionEntriesProps,
  OutputSection,
} from "../../../ui/output-section";

import { IControlProps } from "../../../sidebar/type";
import { useWatch } from "react-hook-form";

export function OutputAchievements({ control }: IControlProps) {
  const achievements = useWatch({
    control,
    name: "achievements",
  });

  if (!achievements || !achievements.length) return null;

  const entries: IOutputSectionEntriesProps[] = achievements.map((acv) => {
    return {
      id: acv.id,
      name: acv.achievementName,
      org: acv.issuerName,
      description: acv.description,
      startDate: acv.date,
    };
  });

  return (
    <section id="achievements">
      <OutputSection
        entries={entries}
        id="achievements"
        heading="Achievements"
      />
    </section>
  );
}
