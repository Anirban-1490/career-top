import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { PropsWithChildren } from "react";

interface IEmptyContentProps {
  title: string;
  description: string;
  buttonContent: string | React.ReactNode;
  buttonProps?: React.ComponentProps<"button">;
  Container?: React.JSXElementConstructor<PropsWithChildren>;
}

export function EmptyContent({
  title,
  description,
  buttonContent,
  buttonProps,
  Container,
}: IEmptyContentProps) {
  const Btn = (
    <Button {...buttonProps}>
      <Plus />
      {buttonContent}
    </Button>
  );

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className=" text-center">
          <h2 className="text-3xl mb-3">{title}</h2>
          <p>{description}</p>
        </div>
        {Container ? <Container>{Btn}</Container> : Btn}
      </div>
    </div>
  );
}
