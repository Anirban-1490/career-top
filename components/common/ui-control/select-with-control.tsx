import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendsType } from "@/modules/dashboard/components/trends/schema";
import { IInputWithControlProps } from "@/modules/resume-editor/components/sidebar/type";
import { Root, SelectValueProps } from "@radix-ui/react-select";
import { ReactNode } from "react";
import { Controller, FieldValues } from "react-hook-form";

export default function SelectWithControl<
  TControl extends FieldValues = TrendsType
>({
  control,
  name,
  options = [],
  selectValueProps,
  parentSelectProps,
  id,
}: IInputWithControlProps<TControl> & {
  options: { label: ReactNode; value: string }[] | null;
  selectValueProps?: SelectValueProps;
  parentSelectProps?: React.ComponentProps<typeof Root>;
  id?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => {
        return (
          <div>
            <Select
              {...parentSelectProps}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (parentSelectProps?.onValueChange)
                  parentSelectProps.onValueChange(value);
              }}
            >
              <SelectTrigger className="w-full" id={id}>
                <SelectValue {...selectValueProps} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  return (
                    <SelectItem
                      key={option.value}
                      value={option.value.toLowerCase()}
                    >
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

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
