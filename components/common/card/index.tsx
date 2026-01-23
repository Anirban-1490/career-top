import { cn } from "@/lib/utils";
import React from "react";

interface ICardProps {
  title?: string | React.ReactElement;
  description?: string | React.ReactElement;
  cardProps?: React.HTMLAttributes<HTMLElement>;
  descriptionFirst?: boolean;
  cardContentProps?: React.HTMLAttributes<HTMLDivElement>;
  descriptionProps?: React.HtmlHTMLAttributes<HTMLParagraphElement>;
  titleProps?: React.HtmlHTMLAttributes<HTMLHeadingElement>;
}

export function Card({
  cardProps,
  description,
  title,
  children,
  cardContentProps,
  descriptionFirst = false,
  descriptionProps,
  titleProps,
}: ICardProps & React.PropsWithChildren) {
  return (
    <article
      {...cardProps}
      className={cn(
        "relative  transition duration-500 ease-in-out ease-in px-6 p-6 rounded-xl flex flex-col gap-4 ",
        cardProps?.className,
      )}
    >
      <div className={`flex flex-col gap-2`}>
        <h3
          {...titleProps}
          className={`text-md font-bold ${descriptionFirst ? "order-2" : ""} ${
            titleProps?.className
          }`}
        >
          {title}
        </h3>
        <p {...descriptionProps} className={` ${descriptionProps?.className}`}>
          {description}
        </p>
      </div>
      <div
        className={cn("flex-1", cardContentProps?.className)}
        {...cardContentProps}
      >
        {children}
      </div>
    </article>
  );
}
