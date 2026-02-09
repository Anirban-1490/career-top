"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export function Optimizer({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <section className="w-full h-full">
      <div className=" w-full h-full flex flex-col gap-6">
        <div className="flex">
          <h2 className=" text-3xl font-semibold ">Optimized Resumes</h2>

          <Button
            onClick={(ev) => {
              ev.preventDefault();
              router.push("/dashboard/resume-optimizer/upload");
            }}
            className="ml-auto"
          >
            Upload Resume
          </Button>
        </div>

        <div className="w-full h-full bg-background rounded-lg">{children}</div>
      </div>
    </section>
  );
}
