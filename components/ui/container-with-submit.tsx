import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { Check } from "lucide-react";
import { Spinner } from "./spinner";
interface IContainerWithSubmitProps {
  isFormPending?: boolean;
  buttonContent?: React.ReactElement;
}

export default function ContainerWithSubmit({
  isFormPending,
  buttonContent,
  children,
}: IContainerWithSubmitProps & PropsWithChildren) {
  return (
    <>
      {children}
      <Button
        type="submit"
        className=" w-full capitalize  text-sm col-span-2"
        disabled={isFormPending}
      >
        {!isFormPending ? (
          <>
            {buttonContent ? (
              buttonContent
            ) : (
              <>
                <Check /> done
              </>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </Button>
    </>
  );
}
