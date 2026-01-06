import z from "zod";
import { personalInfoSchema } from "./components/personal-info/schema";
import { workInfoSchema } from "./components/work/schema";
import { socialLinkSchema } from "./components/social-links/schema";
import { projectSchema } from "./components/projects/schema";
import { educationSchema } from "./components/education/schema";
import { achievementsSchema } from "./components/achievements/schema";

export const resumeSchema = z.object({
  personalInformation: personalInfoSchema.optional(),
  socialLinks: socialLinkSchema.optional(),
  //   professionalSummary: z.string().max(1000).optional(),
  workExperience: z.array(workInfoSchema).optional(),
  skills: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      })
    )
    .optional(),
  projects: z.array(projectSchema).optional(),
  education: z.array(educationSchema).optional(),
  achievements: z.array(achievementsSchema).optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string().optional(),
});

export type ResumeOutputType = z.infer<typeof resumeSchema>;
