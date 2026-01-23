import { checkUserIndustryPreferenceTrends } from "@/action/trends";
import { EmptyContent } from "@/modules/dashboard/components/empty-content";
import { IndustryTrend } from "@/modules/dashboard/components/trends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function Trends() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["industry-trend"],
    queryFn: () => checkUserIndustryPreferenceTrends(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IndustryTrend />
    </HydrationBoundary>
  );
}
