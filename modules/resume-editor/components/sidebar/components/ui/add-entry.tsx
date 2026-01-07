import React, { PropsWithChildren, useOptimistic } from "react";
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
import { Plus, Trash } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { deleteResumeSection } from "@/action/delete-resume";
import ContainerWithSubmit from "@/components/ui/container-with-submit";
import { toast } from "sonner";
import { getID } from "@/lib/get-id";
import { AccordionSingleProps } from "@radix-ui/react-accordion";

interface IAddEntryProps<T extends FieldArrayPath<ResumeOutputType>>
  extends IControlProps {
  name: T;
  defaultValue: any;
  noEntryHeader?: string;
  noEntryDescription?: string;
  accordionTriggerContent?: (
    field: FieldArrayWithId<ResumeOutputType, T, "id">
  ) => React.ReactNode;
  accordionTriggerDefaultContent?: string;
  isFormPending?: boolean;
  id?: string;
  userId?: string;
  clean?: boolean;
  parentProps?: Omit<AccordionSingleProps, "type">;
  children: (
    field: FieldArrayWithId<ResumeOutputType, T, "id">,
    index: number
  ) => React.ReactNode;
}

export function AddEntry<T extends FieldArrayPath<ResumeOutputType>>({
  control,
  name,
  defaultValue,
  noEntryDescription,
  noEntryHeader,
  accordionTriggerContent,
  accordionTriggerDefaultContent,
  isFormPending,
  id,
  userId,
  clean = false,
  parentProps,
  children,
}: IAddEntryProps<T>) {
  const { append, fields, remove, replace } = useFieldArray({
    control: control,
    name: name,
  });

  // const [opstimisticField, setOpstimisticField] = useOptimistic(
  //   fields,
  //   (currentState, id) => {
  //     return currentState.filter((field) => field.id !== id);
  //   }
  // );

  return (
    <>
      {fields.length > 0 && (
        <>
          {" "}
          <Accordion
            {...parentProps}
            className={`border-0 flex flex-col gap-8 ${parentProps?.className}`}
            collapsible
            type="single"
          >
            {fields.map((fieldContent, index) => {
              if (!clean) {
                return (
                  <AccordionItem key={fieldContent.id} value={fieldContent.id}>
                    <AccordionTrigger className=" text-white items-center ">
                      <div className="flex items-center gap-2 flex-grow">
                        {accordionTriggerContent
                          ? accordionTriggerContent(fieldContent)
                          : `${accordionTriggerDefaultContent} #${index}`}
                      </div>

                      <div
                        onClick={async (ev) => {
                          ev.preventDefault();
                          const filteredData = fields.filter(
                            (field) => field.id !== fieldContent.id
                          );

                          try {
                            await deleteResumeSection(
                              filteredData,
                              fieldContent.id,
                              id as string,
                              userId as string,
                              name
                            );
                            replace(filteredData);
                            toast.success(`Successfully removed entry.`);
                          } catch (error) {
                            toast.error(
                              `Failed to delete Entry. Please try again!`
                            );
                          }
                        }}
                        className=" ml-auto"
                      >
                        <Trash className=" hover:text-neon-red" size={15} />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="grid grid-cols-2 gap-y-8 gap-x-3">
                      {children(fieldContent, index)}
                      <ContainerWithSubmit
                        isFormPending={isFormPending}
                      ></ContainerWithSubmit>{" "}
                    </AccordionContent>
                  </AccordionItem>
                );
              } else
                return (
                  <React.Fragment key={fieldContent.id}>
                    {" "}
                    {children(fieldContent, index)}
                  </React.Fragment>
                );
            })}
          </Accordion>
        </>
      )}
      {!fields.length && (
        <div className=" text-center">
          <h4>{noEntryHeader}</h4>
          <p className=" text-xs mt-5">{noEntryDescription}</p>
        </div>
      )}
      <Button
        onClick={(ev) => {
          ev.preventDefault();
          append({ ...defaultValue, id: getID() });
        }}
        className=" w-full capitalize  text-sm"
      >
        <Plus /> Add
      </Button>
    </>
  );
}
