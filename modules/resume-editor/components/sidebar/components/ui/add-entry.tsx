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
  children,
}: IAddEntryProps<T>) {
  const { append, fields, remove, replace } = useFieldArray({
    control: control,
    name: name,
  });

  const [opstimisticField, setOpstimisticField] = useOptimistic(
    fields,
    (currentState, id) => {
      return currentState.filter((field) => field.id !== id);
    }
  );

  return (
    <>
      {fields.length > 0 && (
        <>
          {" "}
          <Accordion
            className="border-0 flex flex-col gap-8"
            collapsible
            type="single"
          >
            {fields.map((fieldContent, index) => {
              if (!clean) {
                return (
                  <AccordionItem key={fieldContent.id} value={fieldContent.id}>
                    <AccordionTrigger className=" text-white items-center justify-between">
                      {accordionTriggerContent ? (
                        <>{accordionTriggerContent(fieldContent)}</>
                      ) : (
                        <div className="flex-grow">{`${accordionTriggerDefaultContent} #${index}`}</div>
                      )}
                      <div>
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
                        >
                          <Trash className=" hover:text-neon-red" size={15} />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="grid grid-cols-2 gap-y-8 gap-x-3">
                      <ContainerWithSubmit isFormPending={isFormPending}>
                        {children(fieldContent, index)}
                      </ContainerWithSubmit>{" "}
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
          append(defaultValue);
        }}
        className=" w-full capitalize  text-sm"
      >
        <Plus /> Add
      </Button>
    </>
  );
}
