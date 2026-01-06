"use client";

import React, { use } from "react";
import { EmptyContent } from "../empty-content";
import { useRouter } from "next/navigation";

import { addResume } from "@/action/save-resume";
import { getID } from "@/lib/get-id";
import { ResumeOutputType } from "@/modules/resume-editor/components/sidebar/schema";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import dayjs from "dayjs";

interface IALLResumeProps {
  resumesPromise: Promise<
    | {
        docs: ResumeOutputType[];
        error: null;
      }
    | {
        error: any;
        docs?: undefined;
      }
  >;
  userId: string;
}

export function AllResume({ resumesPromise, userId }: IALLResumeProps) {
  const { docs: resumes, error } = use(resumesPromise);

  const router = useRouter();

  return (
    <div className="w-full h-full">
      {!resumes?.length && (
        <EmptyContent
          title="No Resumes "
          description="Get started on crafting your first resume to kickstart your career journey"
          buttonContent="Create New Resume"
          buttonProps={{
            onClick: async (ev) => {
              const id = getID();
              await addResume({
                resume: {
                  id,
                },
                resumeId: id,
                userId: userId,
              });
              router.push(`/resume/editor?id=${id}`);
              return;
            },
          }}
        />
      )}
      {resumes && resumes.length > 0 && (
        <>
          <h4 className=" text-3xl font-semibold mb-10">All Resumes</h4>
          <div className=" flex gap-10 flex-wrap">
            {resumes.map((resume) => {
              return (
                <div
                  className="w-[18rem] h-[21rem]  rounded-md overflow-hidden flex flex-col"
                  key={resume.id}
                >
                  <div className=" basis-[50%] bg-white"></div>
                  <div className=" bg-background flex-grow flex flex-col items-center p-5 ">
                    <h3 className=" text-2xl flex-grow font-bold">
                      {resume.name}
                    </h3>
                    <div className="w-full flex gap-3 justify-center items-center">
                      <div className=" basis-[40%]">
                        <h5 className="text-sm">Created At:</h5>
                        <p className=" text-xs">
                          {dayjs(resume.createdAt).format("YYYY-MM-DD")}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          router.push(`/resume/editor?id=${resume.id}`);
                        }}
                        className=" flex-grow"
                      >
                        <Edit /> Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
