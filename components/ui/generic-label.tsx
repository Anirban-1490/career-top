import React, { ComponentProps, PropsWithChildren } from "react";
export interface IGenericLabelProps {
  parentProps?: ComponentProps<"div">;
  labelProps?: ComponentProps<"label">;
  labelContent?: string;
}

export function GenericLabel({
  parentProps,
  labelContent,
  labelProps,
  children,
}: IGenericLabelProps & PropsWithChildren) {
  return (
    <div {...parentProps}>
      {labelContent && (
        <label
          {...labelProps}
          className={`text-xs capitalize mb-2 block ${labelProps?.className}`}
        >
          {labelContent}
        </label>
      )}
      {children}
    </div>
  );
}
