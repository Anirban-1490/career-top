import {
  addUserIndustryPreference,
  checkUserIndustryPreferenceTrends,
} from "@/action/trends";
import { inngest } from "../client";
import { auth } from "@/firebase/firebase-server";

export const trendsJob = inngest.createFunction(
  { id: "industry-trends", retries: 0 },
  { cron: "0 0 * * 1" },
  async ({ event, step }) => {
    //* get all the autheticated users
    const users = (await auth.listUsers()).users;

    //* fan-out pattern: map all the users with event
    const events = users.map((user) => {
      return {
        name: "app/update-industry-trends",
        data: {
          userId: user.uid,
        },
      };
    });

    //* fire all the events in parallel
    await step.sendEvent("send-industry-trends", events);
  },
);

export const updateIndustryTrendsCRON = inngest.createFunction(
  { id: "update-industry-trends", retries: 0 },
  { event: "app/update-industry-trends" },
  async ({ event, step }) => {
    const { userId } = event.data;
    const previousrecord = await step.run("check-user-industry", async () => {
      return await checkUserIndustryPreferenceTrends(userId);
    });

    if (!previousrecord) return;

    const { currentSkills, specialization, industry, experience } =
      previousrecord;

    await step.run("update-user-industry-trends", async () => {
      return await addUserIndustryPreference(
        { currentSkills, specialization, industry, experience },
        userId,
      );
    });
  },
);
