import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { trackerSchema, TrackerType } from "../../schema";
import { InputWithControl } from "@/modules/resume-editor/components/sidebar/components/ui/input-with-control";
import { getID } from "@/lib/get-id";
import { IJobCardData, Tracker } from "@/types/tracker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJobTracker } from "@/action/tracker";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface ITrackerDialogProps {
  trackerType: "applied" | "interviewing" | "offer" | "rejected";
}

export function TrackerDialog({
  children,
  trackerType,
}: PropsWithChildren<ITrackerDialogProps>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackerType>({
    resolver: zodResolver(trackerSchema),

    defaultValues: {
      companyName: "",
      role: "",
    },
  });

  const { mutate: addTrackerMutate, isPending: isTrackerGettingAdded } =
    useMutation({
      mutationKey: ["add-job-tracker"],
      mutationFn: async ({
        jobCardData,
        tracker,
        id,
      }: {
        jobCardData: IJobCardData;
        tracker: Tracker;
        id: string;
      }) => {
        return await addJobTracker(jobCardData, tracker, id);
      },

      onSettled: async (data) => {
        if (data?.error) {
          toast.error(`Failed to add job tracker. Please try again!`);
        } else {
          await queryClient.invalidateQueries({
            queryKey: ["job-tracker-data"],
          });
          setOpen(false);
          toast.success(`Job tracker added successfully!`);
        }
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[25rem]">
        <DialogHeader>
          <DialogTitle>Add {trackerType}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => {
            const id = getID();
            const jobCardData: IJobCardData = {
              ...data,
              id,
              tracker: trackerType,
              addedAt: new Date().toString(),
              updatedAt: new Date().toString(),
            };
            addTrackerMutate({
              jobCardData,
              tracker: trackerType,
              id,
            });
          })}
        >
          <div className=" flex flex-col gap-8">
            <InputWithControl<TrackerType>
              labelContent="Job Role"
              type="text"
              control={control}
              name={"role"}
            />
            <InputWithControl<TrackerType>
              labelContent="Company Name"
              type="text"
              control={control}
              name={"companyName"}
            />
            <InputWithControl<TrackerType>
              labelContent="Job Url"
              type="text"
              control={control}
              name={"jobUrl"}
            />
            <InputWithControl<TrackerType>
              labelContent="Salary"
              type="text"
              control={control}
              name={"salary"}
            />
            <InputWithControl<TrackerType>
              labelContent="Location"
              type="text"
              control={control}
              name={"location"}
            />

            {errors && (
              <div>
                <p>{errors.root?.message}</p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-5">
            <DialogClose disabled={isTrackerGettingAdded} asChild>
              <Button size={"sm"} variant={"ghost"} type="button">
                Close
              </Button>
            </DialogClose>
            <Button size={"sm"} disabled={isTrackerGettingAdded} type="submit">
              {isTrackerGettingAdded ? <Spinner /> : "Add Tracker"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
