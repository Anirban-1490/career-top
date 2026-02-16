import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function SuccessPage() {
  const router = useRouter();
  return (
    <div className=" text-center h-full mt-20  ">
      <FileCheck className="mx-auto size-30 mb-10" />

      <h2 className="text-5xl">Success!!</h2>
      <p>Your resume has been successfully optimized.</p>

      <Button
        onClick={(ev) => {
          ev.preventDefault();
          router.push("/dashboard/resume-optimizer");
        }}
        className="mt-7"
      >
        Check it out
      </Button>
    </div>
  );
}
