"use server";

import { ajlib } from "@/lib/arcjet";
import { geminiAI } from "@/services/gemini";
import { ArcjetRateLimitReason } from "@arcjet/next";
import dayjs from "dayjs";
import { UserProfile } from "./user-profile";
import { redirect } from "next/navigation";

const AIEnhancerPrompt = (description: string) => `
Make yourself as a expert resume analyzer who gives very ATS friendly resume.
Now check this check this description of something the User has worked on, and improve it for ATS friendly

${description}

Put the output in this below format in JSON .


Output format - 
{
    enhancedText:{output}
}


DO NOT PUT ANY OTHER EXTRA TEXT, JUST OUTPUT ONLY IN THIS PROVIDED FORMAT.
ALSO KEEP THE SAME TYPE OF HTML MARKUP THAT THE USER HAS PROVIDED AND KEEP IT HTML ORIENTED.
AND DO NOT PROVIDE ANY EXTRA CONTEXT THAT THE USER HASENT PROVIDED IN ITS DESCRIPTION

`;

export async function AIEnhancer(description: string) {
  let maxToken, remaining;
  try {
    const user = await UserProfile();
    if (!user) redirect("sign-up");

    const ajResult = await ajlib({
      tokenMaxCapacity: 5,
      tokenInterval: "1d",
      tokenRefillRate: 1,
      config: {
        userId: user?.uid,
      },
    });
    (maxToken = ajResult?.maxToken), (remaining = ajResult?.remaining);

    const aiResponse = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        text: AIEnhancerPrompt(description),
      },
    });

    //* remove the ```json``` from the ai response with a regex
    const formattedText = aiResponse.text?.match(/\{[^}]*\}/i)?.[0];
    const jsonOutput = JSON.parse(formattedText as string) as {
      enhancedText: string;
    };
    return {
      ...jsonOutput,
      message: "",
      rateLimit: {
        maxToken,
        remaining,
        hasExceededRateLimit: remaining === 0,
      },
    };
  } catch (error) {
    if (error instanceof ArcjetRateLimitReason) {
      //* rate limited user
      return {
        enhancedText: "",
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
      enhancedText: "",
      message: "Something went wrong. Please try again!",
      rateLimit: {
        maxToken,
        remaining,
        hasExceededRateLimit: remaining === 0,
      },
    };
  }
}
