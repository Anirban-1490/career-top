import { getUserOptimziedResume } from "@/action/optimizer";
import { ResumeReport } from "@/modules/dashboard/components/resume-optimizer/components/report";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


export default async function OptimizedResume({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  if (!resumeId) return;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["optimised-resume"],
    queryFn: async () => {
      return getUserOptimziedResume(resumeId);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResumeReport resumeId={resumeId} />
    </HydrationBoundary>
  );
}
