import { Control } from "react-hook-form";
import { ResumeOutputType } from "./schema";
import { IGenericLabelProps } from "@/components/ui/generic-label";

export interface IControlProps<TControl> {
  control: Control<TControl>;
  isFormPending?: boolean;
  id?: string;
  userId?: string;
}

export interface IInputWithControlProps<TControl = ResumeOutputType>
  extends IControlProps<TControl>,
    IGenericLabelProps {
  name: Path<TControl>;
}
