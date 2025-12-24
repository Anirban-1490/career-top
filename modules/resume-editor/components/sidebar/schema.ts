import z from "zod";
import { personalInfoSchema } from "./components/personal-info/schema";
import { workInfoSchema } from "./components/work/schema";
import { socialLinkSchema } from "./components/social-links/schema";
import { projectSchema } from "./components/projects/schema";
import { educationSchema } from "./components/education/schema";
import { achievementsSchema } from "./components/achievements/schema";

export const resumeSchema = z.object({
  personalInformation: personalInfoSchema,
  socialLinks: socialLinkSchema,
  //   professionalSummary: z.string().max(1000).optional(),
  workExperience: z.array(workInfoSchema),
  skills: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ),
  projects: z.array(projectSchema),
  education: z.array(educationSchema),
  achievements: z.array(achievementsSchema),
});

export type ResumeOutputType = z.infer<typeof resumeSchema>;
