"use client";

import React, { useState } from "react";
import { EmptyContent } from "../empty-content";
import { useRouter } from "next/navigation";

export function AllResume() {
  const isThereResume =
    typeof localStorage !== "undefined" ? localStorage.getItem("resume") : null;
  const [resumeValue, setResumeValue] = useState<boolean | null>(
    Boolean(isThereResume)
  );
  const router = useRouter();

  return (
    <div className="w-full h-full">
      {!resumeValue && (
        <EmptyContent
          title="No Resumes "
          description="Get started on crafting your first resume to kickstart your career journey"
          buttonContent="Create New Resume"
          buttonProps={{
            onClick: (ev) => {
              if (!resumeValue) {
                router.push("/resume/editor");
                return;
              }
              setResumeValue(true);
            },
          }}
        />
      )}
      {resumeValue && (
        <>
          <h2 className=" text-3xl font-semibold">All Resumes</h2>
          <div></div>
        </>
      )}
    </div>
  );
}
