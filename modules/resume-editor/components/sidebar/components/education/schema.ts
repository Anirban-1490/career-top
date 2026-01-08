import z from "zod";

export const educationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institute: z.string(),
  description: z.string().optional(),
  location: z.string(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isCurrentlyStudying: z.boolean().catch(false),
});
