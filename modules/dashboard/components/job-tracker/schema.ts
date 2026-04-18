import z from "zod";

export const trackerSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  jobUrl: z.url().optional(),
  salary: z.number().optional(),

  location: z
    .string()
    .refine((value) => (value === undefined ? "" : value))
    .optional(),
});

export type TrackerType = z.infer<typeof trackerSchema>;
