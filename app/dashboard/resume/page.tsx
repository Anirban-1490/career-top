import { user } from "@/lib/user";
import { getResumes } from "@/modules/dashboard/action/get-resumes";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const UserResumes = dynamic(() =>
  import("@/modules/dashboard/components/resume").then(
    (value) => value.AllResume
  )
);

export default async function Resume() {
  const resumesPromise = getResumes(user?.uid as string);

  return (
    <div className="w-full h-full">
      <Suspense fallback={"loading..."}>
        <UserResumes
          userId={user?.uid as string}
          resumesPromise={resumesPromise}
        />
      </Suspense>
    </div>
  );
}
