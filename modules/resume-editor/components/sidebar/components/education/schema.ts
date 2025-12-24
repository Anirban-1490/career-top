import z from "zod";

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institute: z.string(),
  description: z.string().optional(),
  location: z.string(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  isCurrentlyStudying: z.boolean().catch(false),
});
