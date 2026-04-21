"use client";

import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { Button } from "@/components/ui/button";
import { download, getDomain } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Download, Home, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { RefObject } from "react";

export function EditorNavbar({
  ref,
  resumeId,
}: {
  ref: RefObject<HTMLDivElement | null>;
  resumeId: string;
}) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: [`download-resume`, resumeId],
    mutationFn: async ({
      htmlContent,
      id,
    }: {
      htmlContent: string;
      id: string;
    }) => {
      return await axios.post(
        `${getDomain()}/api/download-resume`,
        {
          html: htmlContent,
          resumeId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );
    },
    onSettled(data, error) {
      if (error) {
        return;
      }
      const blob = new Blob([data?.data], { type: "application/pdf" });

      download(blob, resumeId);
    },
  });

  const downloadPDFHandler = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault();

    if (!ref.current) return;

    //* get the resume-output's HTML content
    const htmlContent = ref?.current?.outerHTML;
    let cssText = "";

    //* get all the raw CSS styles
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = Array.from(sheet.cssRules);
        const cssStyleRule = rules.map((rule) => rule.cssText).join("\n");
        cssText += cssStyleRule;
      } catch (error) {
        console.log("cross-origin sheet error ");
      }
    }

    const fullHtml = `
      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        
        <style>
        ${cssText}
          /* Force colors to show up in PDF */
          body { -webkit-print-color-adjust: exact !important; }
          #resume-preview { margin: 0 !important; width: 210mm; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

    mutate({ htmlContent: fullHtml, id: resumeId });
  };

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
            disabled={!!isPending}
            onClick={downloadPDFHandler}
            className=" capitalize font-bold  text-base min-w-50"
          >
            {!isPending ? (
              <>
                <Download /> Download resume
              </>
            ) : (
              <ContainerWithSpinner spinnerProps={{ className: "size-5" }} />
            )}
          </Button>
          <Button variant={"ghost"} className=" font-bold  text-base">
            <Share /> Share
          </Button>
        </div>
      </div>
    </header>
  );
}
