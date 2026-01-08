"use client";

import { Button } from "@/components/ui/button";
import { Download, Home, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { RefObject } from "react";

export function EditorNavbar({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();

  return (
    <header className="">
      <div className="py-3 px-10 flex justify-between ">
        <div>
          <Button
            variant={"ghost"}
            className=" capitalize font-bold  text-base"
            onClick={() => {
              router.push("/dashboard/resume");
            }}
          >
            <Home /> go back
          </Button>
        </div>
        <div className=" flex gap-4">
          <Button
            onClick={async (ev) => {
              ev.preventDefault();
              // const html2pdf = (await import("html2pdf.js")).default;
              // const worker = html2pdf();
              // await worker
              //   .from(ref.current as HTMLDivElement)
              //   .set({
              //     margin: 1.4,
              //     filename: "resume.pdf",
              //     html2canvas: { scale: 1 },
              //     jsPDF: {
              //       unit: "in",
              //       format: [9, 11.7],
              //       orientation: "portrait",
              //     },
              //   })
              //   .save();
            }}
            className=" capitalize font-bold  text-base"
          >
            <Download /> Download resume
          </Button>
          <Button variant={"ghost"} className=" font-bold  text-base">
            <Share /> Share
          </Button>
        </div>
      </div>
    </header>
  );
}
