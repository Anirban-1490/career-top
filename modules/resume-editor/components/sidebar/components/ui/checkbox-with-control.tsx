import { Checkbox } from "@/components/ui/checkbox";

import { Controller, FieldValues } from "react-hook-form";
import { IInputWithControlProps } from "../../type";
import { ResumeOutputType } from "../../schema";
import { IGenericLabelProps } from "@/components/ui/generic-label";

export function CheckboxWithControl<
  TControl extends FieldValues = ResumeOutputType,
>({
  control,
  name,
  labelContent,
  id,
  parentContainerProps,
  labelProps,
}: IInputWithControlProps<TControl> & {
  id: string;
  parentContainerProps?: React.ComponentProps<"div">;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div
            {...parentContainerProps}
            className={`col-span-2 ${parentContainerProps?.className}`}
          >
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={(ev) => {
                field.onChange(ev);
              }}
              labelContent={labelContent}
              id={id}
              labelProps={labelProps}
            />
          </div>
        );
      }}
    />
  );
}
