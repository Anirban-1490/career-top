import { UserProfile } from "@/action/user-profile";
import { getResumes } from "@/modules/dashboard/action/get-resumes";
import dynamic from "next/dynamic";

const UserResumes = dynamic(
  () =>
    import("@/modules/dashboard/components/resume").then(
      (value) => value.AllResume
    ),
  { ssr: false }
);

export default async function Resume() {
  const user = await UserProfile();
  const resumes = await getResumes(user?.uid as string);

  return (
    <div className="w-full h-full">
      <UserResumes userId={user?.uid as string} resumes={resumes} />
    </div>
  );
}
