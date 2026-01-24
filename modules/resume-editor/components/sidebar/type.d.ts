import { Control, FieldValues } from "react-hook-form";
import { ResumeOutputType } from "./schema";
import { IGenericLabelProps } from "@/components/ui/generic-label";

export interface IControlProps<
  TControl extends FieldValues = ResumeOutputType
> {
  control: Control<TControl>;
  isFormPending?: boolean;
  id?: string;
  userId?: string;
}

export interface IInputWithControlProps<
  TControl extends FieldValues = ResumeOutputType
> extends IControlProps<TControl>,
    IGenericLabelProps {
  name: Path<TControl>;
}
