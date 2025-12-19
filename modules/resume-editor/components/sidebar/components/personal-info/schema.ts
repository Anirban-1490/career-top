import z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  location: z.string(),
});

// export type personalInfotType = z.infer<typeof personalInfoSchema>;
