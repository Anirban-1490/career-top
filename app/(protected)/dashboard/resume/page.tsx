import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { user } from "@/lib/user";
import { getResumes } from "@/modules/dashboard/action/get-resumes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const UserResumes = dynamic(() =>
  import("@/modules/dashboard/components/resume").then(
    (value) => value.AllResume
  )
);

export default async function Resume() {
  // const resumesPromise = getResumes(user?.uid as string);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["resumes", user?.uid as string],
    queryFn: () => getResumes(user?.uid as string),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full h-full">
        <UserResumes userId={user?.uid as string} />
      </div>
    </HydrationBoundary>
  );
}
