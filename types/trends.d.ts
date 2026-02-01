import { TrendsType } from "@/modules/dashboard/components/trends/schema";

export type AITrendsType = {
  demandLevel: "High" | "Medium" | "Low";
  growthRate: { month: string; rate: number }[];
  recommendedSkills: string[];
  topSkills: string[];
  salaryRanges: { role: string; min: number; max: number }[];
};

export type IndustryTrendsType = TrendsType & {
  aiResponse: AITrendsType;
};
