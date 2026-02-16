import { getUserOptimizedResumes } from "@/action/optimizer";
import { Optimizer } from "@/modules/dashboard/components/resume-optimizer";
import { DataTable } from "@/modules/dashboard/components/resume-optimizer/components/datatable";
import { UserOptimizedResumeQueryType } from "@/types/optimizer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function ResumeOptimizer() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["optimized-resumes"],
    queryFn: async () => {
      return await getUserOptimizedResumes();
    },
  });

  const data = queryClient.getQueryData<UserOptimizedResumeQueryType>([
    "optimized-resumes",
  ]);

  if (!data?.optimizedResumes || !data?.optimizedResumes.length) {
    redirect("/dashboard/resume-optimizer/upload");
  }

  return (
    <Optimizer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </Optimizer>
  );
}
