"use server";

import { ajlib, IAJLibProps } from "@/lib/arcjet";
import { geminiAI } from "@/services/gemini";
import { ArcjetRateLimitReason } from "@arcjet/next";
import dayjs from "dayjs";
import { checkUser } from "./user-profile";
import { redirect } from "next/navigation";
import {
  AIEnhancerPrompt,
  IndustryTrendsPrompt,
} from "@/services/gemini/prompts";

import { TrendsType } from "@/modules/dashboard/components/trends/schema";
import { AITrendsType } from "@/types/trends";

interface IAIGenerateContentProps {
  rateLimit?: IAJLibProps;
  prompt: string | (() => string);
}

const AIGenerateContent = async <T>({
  rateLimit,
  prompt,
}: IAIGenerateContentProps): Promise<{
  rateLimit?:
    | {
        maxToken: number | undefined;
        remaining: number | undefined;
        hasExceededRateLimit: boolean;
      }
    | undefined;
  aiResponse: T | null;
  message: string;
}> => {
  let maxToken, remaining;
  try {
    if (rateLimit) {
      const ajResult = await ajlib({
        ...rateLimit,
      });
      ((maxToken = ajResult?.maxToken), (remaining = ajResult?.remaining));
    }

    const aiResponse = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        text: typeof prompt == "string" ? prompt : prompt(),
      },
    });

    //* remove the ```json``` from the ai response with a regex
    const formattedText = aiResponse.text?.replace(/^```[\w]*\s*|\s*```$/g, "");

    const jsonOutput = JSON.parse(formattedText as string);
    return {
      aiResponse: jsonOutput,
      message: "",
      ...(rateLimit
        ? {
            rateLimit: {
              maxToken,
              remaining,
              hasExceededRateLimit: remaining === 0,
            },
          }
        : {}),
    };
  } catch (error) {
    if (error instanceof ArcjetRateLimitReason) {
      //* rate limited user
      return {
        aiResponse: null,
        message: `Oops! Limit Reached. Next refill in ${dayjs(
          error.resetTime,
        ).diff(dayjs(), "hours")}h`,
        rateLimit: {
          maxToken: error.max,
          remaining: error.remaining,
          hasExceededRateLimit: error.remaining === 0,
        },
      };
    }
    return {
      aiResponse: null,
      message: "Something went wrong. Please try again!",
      ...(rateLimit
        ? {
            rateLimit: {
              maxToken,
              remaining,
              hasExceededRateLimit: remaining === 0,
            },
          }
        : {}),
    };
  }
};

export async function AIEnhancer(description: string) {
  const user = await checkUser();
  if (!user) redirect("/sign-up");
  const result = await AIGenerateContent<{ enhancedText: string }>({
    prompt: () => {
      return AIEnhancerPrompt(description);
    },
    rateLimit: {
      tokenMaxCapacity: 5,
      tokenInterval: "1d",
      tokenRefillRate: 1,
      config: {
        userId: user.uid,
      },
    },
  });

  return {
    ...result,
  };
}

export async function AIIndustryTrends(props: Omit<TrendsType, "nextUpdate">) {
  const result = await AIGenerateContent<AITrendsType>({
    prompt: () => {
      return IndustryTrendsPrompt({ ...props });
    },
    // rateLimit: {
    //   tokenMaxCapacity: 5,
    //   tokenInterval: "1d",
    //   tokenRefillRate: 1,
    // },
  });

  return {
    ...result,
  };
}
