import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { IInputWithControlProps } from "../work/type";

export function InputWithControl({
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
          <Input
            parentProps={{
              className: "col-span-2",
            }}
            value={(field.value as string) || ""}
            type={"text"}
            onChange={(ev) => {
              field.onChange(ev.target.value);
            }}
            labelContent={labelContent}
            className="border border-input-outline bg-background text-white"
          />
        );
      }}
    />
  );
}
