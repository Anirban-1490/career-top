import { IGenericLabelProps } from "@/components/ui/generic-label";
import { IControlProps } from "../../type";
import { ResumeOutputType } from "../../schema";
import { Path } from "react-hook-form";

export interface IInputWithControlProps
  extends IControlProps,
    IGenericLabelProps {
  name: Path<ResumeOutputType>;
}
