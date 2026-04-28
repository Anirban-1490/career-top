import { getResume } from "@/action/get-resume";
import { UserProfile } from "@/action/user-profile";

import { Editor } from "@/modules/resume-editor";

export default async function ResumeEditor({
  searchParams,
}: {
  searchParams: Promise<{ id: string | undefined }>;
}) {
  const { id } = await searchParams;
  const user = await UserProfile();

  const dataPromise = getResume(user?.uid as string, id as string);

  return (
    <Editor
      dataPromise={dataPromise}
      id={id as string}
      userId={user?.uid as string}
    />
  );
}
