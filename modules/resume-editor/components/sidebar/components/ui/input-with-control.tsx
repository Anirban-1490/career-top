import { Input } from "@/components/ui/input";
import { Controller, FieldValues } from "react-hook-form";

import React from "react";
import { IInputWithControlProps } from "../../type";
import { ResumeOutputType } from "../../schema";

export function InputWithControl<
  TControl extends FieldValues = ResumeOutputType,
>({
  control,
  name,
  labelContent,
  parentProps,
  containerProps,
  ...props
}: IInputWithControlProps<TControl> &
  React.ComponentProps<"input"> & {
    containerProps?: React.ComponentProps<"div">;
  }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        return (
          <div
            {...containerProps}
            className={`col-span-2 ${containerProps?.className}`}
          >
            <Input
              {...props}
              parentProps={{
                ...parentProps,
                className: `col-span-2 ${parentProps?.className}`,
              }}
              value={(field.value as string) || ""}
              type={props.type || "text"}
              onChange={(ev) => {
                const value =
                  props.type == "number"
                    ? parseInt(ev.target.value)
                    : ev.target.value;

                field.onChange(value);
              }}
              labelContent={labelContent}
              className={`border border-input-outline bg-background text-white ${props.className}`}
            />
            {errors && (
              <p className=" text-sm text-red-500 mt-1">
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
