import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { trendsSchema, TrendsType } from "../schema";
import { InputWithControl } from "@/modules/resume-editor/components/sidebar/components/ui/input-with-control";
import SelectWithControl from "@/components/common/ui-control/select-with-control";
import { industries, TIndustries } from "@/data/industries";
import { addUserIndustryPreference } from "@/action/trends";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const industryOptions = industries.map((industry) => {
  return {
    value: industry.id,
    label: industry.name,
  };
});
const getCurrentSpecialization = (value: string) => {
  return industries.find((industry) => industry.id == value);
};

//* This is a type derived rom trendsType so the input/output value in hook-form stats string for currentSkills
type DerivedTrendsType = {
  [K in keyof TrendsType]: TrendsType[K] extends string[]
    ? unknown
    : TrendsType[K];
};

export function IndustryPreferenceDialog({
  children,
  initialData,
}: PropsWithChildren & {
  initialData?: Omit<TrendsType, "nextUpdate">;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [specialization, setspecialization] = useState<TIndustries | undefined>(
    initialData?.specialization
      ? getCurrentSpecialization(initialData?.industry)
      : undefined,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DerivedTrendsType>({
    resolver: zodResolver(trendsSchema),
    defaultValues: {
      ...initialData,
      currentSkills: initialData?.currentSkills.join(","),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-trend"],
    mutationFn: async (formValue: TrendsType) => {
      return addUserIndustryPreference({ ...formValue });
    },
    onSettled: async (data) => {
      if (!data?.error) {
        toast.success(data?.message);
        await queryClient.invalidateQueries({ queryKey: ["industry-trend"] });
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleTrends = async (formValue: TrendsType) => {
    mutate(formValue);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[25rem]">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Add your prefernces to view the latest trends
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => handleTrends(data as TrendsType))}
        >
          <div className=" flex flex-col gap-8">
            <SelectWithControl
              options={industryOptions}
              selectValueProps={{ placeholder: "Select an industry" }}
              control={control}
              name={"industry"}
              parentSelectProps={{
                onValueChange(value) {
                  setspecialization(() => {
                    return getCurrentSpecialization(value);
                  });
                },
              }}
            />
            <SelectWithControl
              options={
                specialization?.subIndustries.map((spec) => {
                  return {
                    label: spec,
                    value: spec.toLowerCase(),
                  };
                }) || []
              }
              selectValueProps={{ placeholder: "Select your specialization" }}
              control={control}
              name={"specialization"}
            />
            <InputWithControl<DerivedTrendsType>
              labelContent="Experience (in years)"
              type="number"
              control={control}
              name={"experience"}
            />
            <InputWithControl<DerivedTrendsType>
              labelContent="Skills (, separated)"
              type="text"
              control={control}
              name={"currentSkills"}
            />
            {errors && (
              <div>
                <p>{errors.root?.message}</p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-5">
            <DialogClose disabled={isPending} asChild>
              <Button size={"sm"} variant={"ghost"} type="button">
                Close
              </Button>
            </DialogClose>
            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? <Spinner /> : "Add Preference"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
