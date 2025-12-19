import React, { PropsWithChildren } from "react";
import {
  FieldArrayPath,
  FieldArrayPathValue,
  useFieldArray,
  UseFieldArrayAppend,
} from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import { IControlProps } from "../../type";
import { ResumeOutputType } from "../../schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface IAddEntryProps<T extends FieldArrayPath<ResumeOutputType>>
  extends IControlProps {
  name: T;
  defaultValue: any;
  noEntryHeader?: string;
  noEntryDescription?: string;
  children: (
    fields: FieldArrayWithId<ResumeOutputType, T, "id">[]
  ) => React.ReactNode;
}

export function AddEntry<T extends FieldArrayPath<ResumeOutputType>>({
  control,
  name,
  defaultValue,
  noEntryDescription,
  noEntryHeader,
  children,
}: IAddEntryProps<T>) {
  const { append, fields, remove } = useFieldArray({
    control: control,
    name: name,
  });

  return (
    <>
      {fields.length > 0 && <>{children(fields)}</>}
      {!fields.length && (
        <div className=" text-center">
          <h4>{noEntryHeader}</h4>
          <p className=" text-xs mt-5">{noEntryDescription}</p>
        </div>
      )}
      <Button
        onClick={(ev) => {
          ev.preventDefault();
          append(defaultValue);
        }}
        className=" w-full capitalize  text-sm"
      >
        <Plus /> Add
      </Button>
    </>
  );
}
