"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { GenericLabel, IGenericLabelProps } from "./generic-label";

function Checkbox({
  className,
  labelContent,
  parentProps,
  labelProps,
  hidden,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & IGenericLabelProps) {
  return (
    <GenericLabel
      parentProps={{
        className: `flex gap-4 item-center ${parentProps?.className}`,
        ...parentProps,
      }}
      hidden={hidden}
      labelContent={labelContent}
      labelProps={{
        htmlFor: props.id,
        className: `mb-0 ${labelProps?.className || ""}`,
        ...labelProps,
      }}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer -order-1 border-input-outline dark:bg-input/30 data-[state=checked]:bg-neon-red data-[state=checked]:text-primary-foreground   focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <CheckIcon className="size-3.5 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </GenericLabel>
  );
}

export { Checkbox };
