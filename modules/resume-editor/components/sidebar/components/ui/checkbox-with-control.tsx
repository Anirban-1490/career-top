import { Checkbox } from "@/components/ui/checkbox";

import { Controller } from "react-hook-form";
import { IInputWithControlProps } from "../work/type";

export function CheckboxWithControl({
  control,
  name,
  labelContent,
  id,
}: IInputWithControlProps & { id: string }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className=" col-span-2">
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={(ev) => {
                field.onChange(ev);
              }}
              labelContent={labelContent}
              id={id}
            />
          </div>
        );
      }}
    />
  );
}
