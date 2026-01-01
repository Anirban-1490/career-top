import { Spinner } from "@/components/ui/spinner";
import { ComponentProps, PropsWithChildren, SVGProps } from "react";

interface IContainerWithSpinnerProps {
  parentProps?: ComponentProps<"div">;
  spinnerProps?: SVGProps<SVGSVGElement>;
}

export function ContainerWithSpinner({
  parentProps,
  spinnerProps,
  children,
}: IContainerWithSpinnerProps & PropsWithChildren) {
  return (
    <div
      {...parentProps}
      className={`w-full h-full flex justify-center items-center ${parentProps?.className}`}
    >
      <Spinner
        {...spinnerProps}
        className={`size-10 ${spinnerProps?.className}`}
      />
      {children}
    </div>
  );
}
