import React, { ReactNode } from "react";
import stepperStyle from "./stepper.module.css";

interface IStepperProps {
  stepLabels: ReactNode[];
  activeStep: number;
}

export function Stepper({ stepLabels, activeStep = 0 }: IStepperProps) {
  return (
    <div className="w-full">
      <div className="flex  w-full">
        {stepLabels.map((label, index) => {
          const isThisStepActive = index === activeStep - 1;
          const isThisStepFinished = index <= activeStep - 1;
          const isFirstStep = index === 0;
          return (
            <div key={index} className={` text-start relative w-full`}>
              {!isFirstStep && (
                <div
                  className={`h-1 absolute w-[80%] top-5 left-[calc(-50%+27px)] right-[calc(50%-30px)] flex-grow bg-input ${stepperStyle["step__connector"]} ${isThisStepFinished ? stepperStyle["fill"] : " "}`}
                ></div>
              )}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full   flex justify-center items-center ${isThisStepActive || isThisStepFinished ? "bg-neon-red" : " bg-input"}`}
                >
                  {index + 1}
                </div>

                <div
                  className={`text-base text-center mt-2 w-full ${isThisStepActive || isThisStepFinished ? "text-neon-red" : " "}`}
                >
                  {label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
