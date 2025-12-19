import z from "zod";
import { personalInfoSchema } from "./components/personal-info/schema";
import { workInfoSchema } from "./components/work/schema";
import { socialLinkSchema } from "./components/social-links/schema";
import { projectSchema } from "./components/projects/schema";

export const resumeSchema = z.object({
  personalInformation: personalInfoSchema,
  socialLinks: socialLinkSchema,
  //   professionalSummary: z.string().max(1000).optional(),
  workExperience: z.array(workInfoSchema),
  //   skillsAndInterests: skillsAndInterestsSchema,
  projects: z.array(projectSchema),
  //   awardsAndAchievements: z.array(awardSchema),
});

export type ResumeOutputType = z.infer<typeof resumeSchema>;
