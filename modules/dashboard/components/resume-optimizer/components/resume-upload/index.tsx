"use client";

import React, { useState } from "react";
import { FileUpload } from "../file-upload";
import { Stepper } from "@/components/common/stepper";
import { SuccessPage } from "../success";

export function UploadPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-full flex flex-col gap-15 overflow-hidden">
      <div className="mx-auto max-w-200 w-200 mt-20">
        <Stepper
          activeStep={step}
          stepLabels={["Upload", "Analyzing", "Success"]}
        />
      </div>
      <div className=" w-full h-full  place-items-center place-content-center">
        {step !== 3 ? <FileUpload setStep={setStep} /> : <SuccessPage />}
      </div>
    </div>
  );
}
