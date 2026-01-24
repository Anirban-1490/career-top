"use server";

import { checkUser } from "./user-profile";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-client";
import { AIIndustryTrends } from "./ai";
import { TrendsType } from "@/modules/dashboard/components/trends/schema";
import { IndustryTrendsType } from "@/types/trends";
import { getDateDuration } from "@/lib/date";

export const checkUserIndustryPreferenceTrends = async (
  initialUserId?: string,
) => {
  try {
    const userId = initialUserId ?? (await checkUser()).uid;

    const preference = await getDoc(doc(db, "trends", userId));

    if (preference.exists()) {
      return preference.data() as IndustryTrendsType;
    }
    // return null;
  } catch (error) {}
};

export const addUserIndustryPreference = async (
  props: Omit<TrendsType, "nextUpdate">,
  initialUserId?: string,
) => {
  const userId = initialUserId ?? (await checkUser()).uid;
  try {
    const { aiResponse, message } = await AIIndustryTrends({ ...props });
    if (!aiResponse) {
      throw new Error(message);
    }
    await setDoc(doc(db, "trends", userId), {
      aiResponse,
      ...props,
      nextUpdate: getDateDuration(),
    });
    return {
      error: "",
      message: "Successfully added preference",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
};
