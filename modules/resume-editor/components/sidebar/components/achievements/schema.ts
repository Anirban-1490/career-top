import z from "zod";

export const achievementsSchema = z.object({
  ID: z.string(),
  achievementName: z.string(),
  issuerName: z.string(),
  url: z.url().nullable(),
  date: z.string().nullable(),
  description: z.string().optional(),
});
