import { getResume } from "@/action/get-resume";
import { user } from "@/lib/user";
import { Editor } from "@/modules/resume-editor";
import { Suspense } from "react";

export default async function ResumeEditor({
  searchParams,
}: {
  searchParams: Promise<{ id: string | undefined }>;
}) {
  const { id } = await searchParams;

  const dataPromise = getResume(user?.uid as string, id as string);

  return (
    <Editor
      dataPromise={dataPromise}
      id={id as string}
      userId={user?.uid as string}
    />
  );
}
