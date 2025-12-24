import { GenericDatePicker } from "@/components/ui/generic-datepicker";
import React from "react";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { IInputWithControlProps } from "../work/type";
import { WYSIWYG } from "@/components/ui/wysiwyg";

export function WYSIWYGWithControl({
  control,
  name,
  labelContent,
}: IInputWithControlProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <WYSIWYG
            onChange={(ev) => {
              field.onChange(ev.target.value);
            }}
            value={field?.value ? (field?.value as string) : ""}
            labelContent={labelContent}
          />
        );
      }}
    />
  );
}
