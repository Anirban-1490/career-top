"use server";

import { ajlib, IAJLibProps } from "@/lib/arcjet";
import { geminiAI } from "@/services/gemini";
import { ArcjetRateLimitReason } from "@arcjet/next";
import dayjs from "dayjs";
import { UserProfile } from "./user-profile";
import { redirect } from "next/navigation";
import { AIEnhancerPrompt } from "@/services/gemini/prompts";

interface IAIGenerateContentProps {
  rateLimit?: Omit<IAJLibProps, "config">;
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
    const user = await UserProfile();
    if (!user) redirect("/sign-up");

    if (rateLimit) {
      const ajResult = await ajlib({
        ...rateLimit,
        config: {
          userId: user?.uid,
        },
      });
      (maxToken = ajResult?.maxToken), (remaining = ajResult?.remaining);
    }

    const aiResponse = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        text: typeof prompt == "string" ? prompt : prompt(),
      },
    });

    //* remove the ```json``` from the ai response with a regex
    const formattedText = aiResponse.text?.match(/\{[^}]*\}/i)?.[0];
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
          error.resetTime
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
  const result = await AIGenerateContent<{ enhancedText: string }>({
    prompt: () => {
      return AIEnhancerPrompt(description);
    },
    rateLimit: {
      tokenMaxCapacity: 5,
      tokenInterval: "1d",
      tokenRefillRate: 1,
    },
  });

  return {
    ...result,
  };
}
