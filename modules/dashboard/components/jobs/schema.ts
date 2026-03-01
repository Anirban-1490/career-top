import z from "zod";

export const jobSearchSchema = z.object({
  searchTerm: z.string().optional(),
  location: z.string().optional(),
  jobtype: z
    .enum(["fulltime", "parttime", "contract", "internship"])
    .optional(),

  isRemote: z.boolean().optional(),
  easyApply: z.boolean().optional(),
  hoursOld: z.enum(["24", "48", "72"]).optional(),
  countryIndeed: z.string().optional(),
});

export type JobSearchType = z.infer<typeof jobSearchSchema>;
