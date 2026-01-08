import z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

// export type personalInfotType = z.infer<typeof personalInfoSchema>;
