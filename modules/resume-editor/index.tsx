"use client";

import React, { use } from "react";
import { EditorNavbar } from "./components/resume-navbar";
import { EditorSidebar } from "./components/sidebar";
import { EditorOutput } from "./components/output";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResumeOutputType, resumeSchema } from "./components/sidebar/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion } from "@/components/ui/accordion";

import { getID } from "@/lib/get-id";
import { addResume, IAddResumeProps } from "@/action/save-resume";
import { useFormStatus } from "react-dom";
import { useMutation } from "@tanstack/react-query";

export function Editor({
  dataPromise,
  userId,
  id,
}: {
  dataPromise: Promise<ResumeOutputType[]>;
  userId: string;
  id: string;
}) {
  const data = use(dataPromise);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ResumeOutputType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data[0],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ ...props }: IAddResumeProps) => {
      return await addResume({ ...props });
    },
  });

  const submitHandler = (data: ResumeOutputType) => {
    mutate({ userId: userId, resume: data, resumeId: id });
  };

  return (
    <main className="h-dvh overflow-hidden flex flex-col">
      <EditorNavbar />
      <main className="flex w-full flex-grow  overflow-hidden">
        <EditorSidebar>
          {(editorSidebarContent) => {
            return (
              <form onSubmit={handleSubmit(submitHandler)}>
                <Accordion
                  type="single"
                  className="flex flex-col gap-5"
                  collapsible
                >
                  {editorSidebarContent.map((Content, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Content isFormPending={isPending} control={control} />
                      </React.Fragment>
                    );
                  })}
                </Accordion>
              </form>
            );
          }}
        </EditorSidebar>
        <EditorOutput control={control} />
      </main>
    </main>
  );
}
