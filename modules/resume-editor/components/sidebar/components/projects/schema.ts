import z from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  url: z.url().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  isCurrentlyWorking: z.boolean().catch(false),
});
