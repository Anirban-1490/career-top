import z from "zod";

export const socialLinkSchema = z.object({
  linkedin: z.url().optional(),
  github: z.url().optional(),
  website: z.url().optional(),
  twitter: z.url().optional(),
});
