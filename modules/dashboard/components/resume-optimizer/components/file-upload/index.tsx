"use client";

import { optimizeResume } from "@/action/optimizer";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { GenericLabel } from "@/components/ui/generic-label";

import { useMutation } from "@tanstack/react-query";
import { FileUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const MAX_FILE_SIZE = 5242880 as const;

export function FileUpload({ setStep }: { setStep: (step: number) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const { isPending, mutate } = useMutation({
    mutationKey: ["resume-analysis"],
    mutationFn: async (file: File) => {
      return await optimizeResume(file);
    },
    onSettled: async (data) => {
      if (data?.error) {
        toast.error(data.message);
        return;
      } else {
        toast.success(data?.message);
        setStep(3);
      }
    },
  });

  if (isPending) {
    return <ContainerWithSpinner loadingLabel={"Analyzing..."} />;
  }

  const uploadFile = (file?: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") return;
    if (file.size >= MAX_FILE_SIZE) {
      toast.error("File exceeded 5MB limit.");
      return;
    }
    mutate(file);
    setStep(2);
  };

  return (
    <div
      id="drop-zone"
      className={`flex justify-center items-center flex-col gap-20 py-20 w-full   rounded-lg transition duration-150 border border-dashed ${isDragging ? " border-neon-red bg-accent-neon-red/5" : "border-input"}`}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
      onDragEnter={(ev) => {
        setIsDragging(true);
      }}
      onDragLeave={(ev) => {
        setIsDragging(false);
      }}
      onDrop={async (ev) => {
        ev.preventDefault();
        setIsDragging(false);
        const file = ev.dataTransfer.files[0];
        uploadFile(file);
      }}
    >
      {/* <div className=" absolute w-full h-full " id="border"></div> */}
      <div>
        <FileUp size={"4rem"} />
      </div>
      <div className=" flex flex-col items-center gap-3">
        <div className="text-base! font-semibold w-fit">
          Drag and drop your resume
        </div>
        <div>OR</div>
        <form action="">
          <GenericLabel
            labelProps={{
              htmlFor: "file",
              className:
                "text-base! font-semibold px-4 py-2 bg-neon-red rounded-md cursor-pointer w-fit",
            }}
            labelContent="Upload your resume"
          >
            <input
              onChange={(ev) => {
                const file = ev.target.files?.[0];
                uploadFile(file);
              }}
              id="file"
              type="file"
              hidden
              accept=".pdf"
            />
          </GenericLabel>
        </form>
      </div>
      <p>
        File should be in <strong>.pdf</strong> format and at max{" "}
        <strong>5MB</strong> in size
      </p>
    </div>
  );
}
