import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

import React from "react";
import { IInputWithControlProps } from "../../type";
import { ResumeOutputType } from "../../schema";

export function InputWithControl<TControl extends ResumeOutputType>({
  control,
  name,
  labelContent,
  parentProps,
  ...props
}: IInputWithControlProps<ResumeOutputType> & React.ComponentProps<"input">) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Input
            {...props}
            parentProps={{
              ...parentProps,
              className: `col-span-2 ${parentProps?.className}`,
            }}
            value={(field.value as string) || ""}
            type={"text"}
            onChange={(ev) => {
              field.onChange(ev.target.value);
            }}
            labelContent={labelContent}
            className={`border border-input-outline bg-background text-white ${props.className}`}
          />
        );
      }}
    />
  );
}
