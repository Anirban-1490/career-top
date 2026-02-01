import { Spinner } from "@/components/ui/spinner";
import React, { ComponentProps, PropsWithChildren, SVGProps } from "react";

interface IContainerWithSpinnerProps {
  parentProps?: ComponentProps<"div">;
  spinnerProps?: SVGProps<SVGSVGElement>;
  loadingLabel?: string | React.ReactNode;
}

export function ContainerWithSpinner({
  parentProps,
  spinnerProps,
  loadingLabel,
  children,
}: IContainerWithSpinnerProps & PropsWithChildren) {
  return (
    <div
      {...parentProps}
      className={`w-full h-full flex flex-col justify-center items-center ${parentProps?.className}`}
    >
      <Spinner
        {...spinnerProps}
        className={`size-10 ${spinnerProps?.className}`}
      />
      {loadingLabel && <div className="mt-2">{loadingLabel}</div>}
      {children}
    </div>
  );
}
