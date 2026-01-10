import { GenericDatePicker } from "@/components/ui/generic-datepicker";
import React from "react";

import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { IInputWithControlProps } from "../work/type";
import { WYSIWYG } from "@/components/ui/wysiwyg";
import { Button } from "@/components/ui/button";
import { AIDialog } from "@/components/common/ai-dialog";

export function WYSIWYGWithControl({
  control,
  name,
  labelContent,
}: IInputWithControlProps) {
  return (
    <div className="col-span-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <>
              <WYSIWYG
                onChange={(ev) => {
                  field.onChange(ev.target.value);
                }}
                value={field?.value ? (field?.value as string) : ""}
                labelContent={labelContent}
              />
              {field.value && (
                <AIDialog
                  addAIEnhancedDescription={(enhancedText) => {
                    field.onChange(enhancedText);
                  }}
                  description={field.value as string}
                >
                  <Button size={"sm"} className="mt-2" variant={"outline"}>
                    Improve With AI
                  </Button>
                </AIDialog>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
