"use client";

import React, { use, useRef } from "react";
import { EditorNavbar } from "./components/resume-navbar";
import { EditorSidebar } from "./components/sidebar";
import { EditorOutput } from "./components/output";
import { FormProvider, useForm } from "react-hook-form";
import { ResumeOutputType, resumeSchema } from "./components/sidebar/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Accordion } from "@/components/ui/accordion";

import { addResume, IAddResumeProps } from "@/action/save-resume";

import { useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

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

  const formMethods = useForm<ResumeOutputType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: data[0],
  });
  const {
    handleSubmit,

    control,
    formState: { errors },
  } = formMethods;
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ ...props }: IAddResumeProps) => {
      return await addResume({ ...props });
    },
  });
  const contentRef = useRef<HTMLDivElement>(null);
  // const printHandler = useReactToPrint({
  //   contentRef,
  //   print: async (target) => {
  //     console.log(target);
  //     const html2pdf = (await import("html2pdf.js")).default;
  //     const worker = html2pdf();
  //     await worker.from(target).set({ filename: "resume.pdf" }).save();
  //   },
  // });

  const submitHandler = (data: ResumeOutputType) => {
    mutate({ userId: userId, resume: data, resumeId: id });
  };

  return (
    <main className="h-dvh overflow-hidden flex flex-col">
      <EditorNavbar contentRef={contentRef} />
      <FormProvider {...formMethods}>
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
                          <Content
                            isFormPending={isPending}
                            control={control}
                            id={id}
                            userId={userId}
                          />
                        </React.Fragment>
                      );
                    })}
                  </Accordion>
                </form>
              );
            }}
          </EditorSidebar>
          <EditorOutput contentRef={contentRef} />
        </main>
      </FormProvider>
      <Toaster richColors position="bottom-right" expand />
    </main>
  );
}
