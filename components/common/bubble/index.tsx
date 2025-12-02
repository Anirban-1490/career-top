import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface IBubbleProps extends PropsWithChildren {
  bubbleProps?: React.HTMLAttributes<HTMLDivElement>;
  bubbleBorderRadius?: string;
  bubbleNotchPosition?:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right";
}

export function Bubble({
  children,
  bubbleProps,
  bubbleNotchPosition = "bottom-left",
  bubbleBorderRadius = "5rem",
}: IBubbleProps) {
  const borderRadiusStyle = {
    "bottom-left": {
      borderTopRightRadius: bubbleBorderRadius,
      borderTopLeftRadius: bubbleBorderRadius,
      borderBottomRightRadius: bubbleBorderRadius,
    },
    "bottom-right": {
      borderTopRightRadius: bubbleBorderRadius,
      borderTopLeftRadius: bubbleBorderRadius,
      borderBottomLeftRadius: bubbleBorderRadius,
    },
    "top-left": {
      borderBottomRightRadius: bubbleBorderRadius,
      borderBottomLeftRadius: bubbleBorderRadius,
      borderTopRightRadius: bubbleBorderRadius,
    },
    "top-right": {
      borderBottomRightRadius: bubbleBorderRadius,
      borderBottomLeftRadius: bubbleBorderRadius,
      borderTopLeftRadius: bubbleBorderRadius,
    },
  };
  return (
    <div
      {...bubbleProps}
      style={{
        ...borderRadiusStyle[bubbleNotchPosition],
        ...bubbleProps?.style,
      }}
      className={cn(
        `flex flex-col justify-between w-[90rem]   `,
        bubbleProps?.className
      )}
    >
      {children}
    </div>
  );
}
