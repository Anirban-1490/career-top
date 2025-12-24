import { GenericDatePicker } from "@/components/ui/generic-datepicker";
import React from "react";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { IInputWithControlProps } from "../work/type";
import { DatePickerProps } from "antd";

export function DatepickerWithControl({
  control,
  name,
  labelContent,
  ...props
}: IInputWithControlProps & DatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <GenericDatePicker
            {...props}
            {...(field.value ? { value: dayjs(field.value as Date) } : {})}
            onChange={(date) => {
              field.onChange(dayjs(date as dayjs.Dayjs).toDate());
            }}
            labelContent={labelContent}
          />
        );
      }}
    />
  );
}
