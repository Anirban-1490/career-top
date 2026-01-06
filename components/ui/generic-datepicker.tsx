import React, { ComponentProps } from "react";
import { GenericLabel, IGenericLabelProps } from "./generic-label";
import { DatePicker, DatePickerProps } from "antd";

export function GenericDatePicker({
  parentProps,
  labelContent,
  ...props
}: IGenericLabelProps & DatePickerProps) {
  return (
    <GenericLabel parentProps={parentProps} labelContent={labelContent}>
      <DatePicker
        {...props}
        className={`w-full ${props.className}`}
        variant="outlined"
      />
    </GenericLabel>
  );
}
