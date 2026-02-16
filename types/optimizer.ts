import { AIGeneratedContentResponseProps } from "@/action/ai";

export type AIResumeOptimizerType = {
  grade: string;
  score: number;
  totalFixCount: FixCountType;
  optimization: {
    experience: SectionOptimizationType | null;
    projects: SectionOptimizationType | null;
    achievements: SectionOptimizationType | null;
    certifications: SectionOptimizationType | null;
    extracurricular: SectionOptimizationType | null;
    publications: SectionOptimizationType | null;
  };
};

type SectionOptimizationType = {
  improvements: { text: string; status: "URGENT" | "CRITICAL" | "OPTIONAL" }[];
  fixCount: FixCountType;
  status: "Looks Good" | "Needs Fix";
};

type FixCountType = {
  urgent: number;
  critical: number;
  optional: number;
};

export type OptimizedResumeType =
  AIGeneratedContentResponseProps<AIResumeOptimizerType | null> & {
    file: {
      size: number;
      name: string;
    };
    id: string;
    createdAt: string;
    updatedAt: string;
  };

export type UserOptimizedResumeQueryType = {
  optimizedResumes: OptimizedResumeType[] | null;
  error: null | unknown;
  message: string;
};
