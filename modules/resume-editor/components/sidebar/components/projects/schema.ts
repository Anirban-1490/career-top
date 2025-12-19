import z from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  url: z.url().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isCurrentlyWorking: z.boolean().catch(false),
});
