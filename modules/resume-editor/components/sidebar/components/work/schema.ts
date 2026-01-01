import z from "zod";

export const workInfoSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional(),
  isRemote: z.boolean().optional(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().min(1).min(1, "Add at least one responsibility"),
});
