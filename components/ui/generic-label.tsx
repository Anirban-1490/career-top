import React, { ComponentProps, PropsWithChildren } from "react";
export interface IGenericLabelProps {
  parentProps?: ComponentProps<"div">;
  labelProps?: ComponentProps<"label">;
  labelContent?: string;
  hidden?: boolean;
}

export function GenericLabel({
  parentProps,
  labelContent,
  labelProps,
  children,
  hidden,
}: IGenericLabelProps & PropsWithChildren) {
  return (
    <div {...parentProps}>
      {labelContent && (
        <label
          {...labelProps}
          className={`text-xs capitalize mb-2 block ${hidden ? "h-0 w-0 absolute opacity-0 mb-0" : ""} ${labelProps?.className}`}
        >
          {labelContent}
        </label>
      )}
      {children}
    </div>
  );
}
