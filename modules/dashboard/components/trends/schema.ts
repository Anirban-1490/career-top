import z, { boolean } from "zod";

export const trendsSchema = z.object({
  industry: z.string({ error: "Please provide a valid industry" }),
  specialization: z.string({ error: "Please provide a valid specialization" }),
  experience: z
    .number({ error: "Please provide a experience between 0 to 25 years" })
    .transform((val) => {
      return val ? val : -1;
    })
    .pipe(
      z
        .number()
        .max(25, { error: "Please Provide a experience of 25 or below" })
        .min(0, { error: "Please provide a experience of 0 or above" }),
    ),
  currentSkills: z.preprocess(
    (value) => {
      return value && typeof value === "string"
        ? value
            .split(",")
            .map((skill) => skill.trim())
            .filter(boolean)
        : [];
    },
    z.array(z.string()).min(1, "Please provide relevant skills"),
  ),
  nextUpdate: z.string().optional(),
});

export type TrendsType = z.infer<typeof trendsSchema>;
