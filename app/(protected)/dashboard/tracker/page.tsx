import { getJobTracker } from "@/action/tracker";
import { JobTracker } from "@/modules/dashboard/components/job-tracker";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

export default async function Tracker() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["job-tracker-data"],
    queryFn: async () => {
      return await getJobTracker();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="h-[91dvh] flex flex-col overflow-hidden">
        <JobTracker />
      </section>
    </HydrationBoundary>
  );
}
