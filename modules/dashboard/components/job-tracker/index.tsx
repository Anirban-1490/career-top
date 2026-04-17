"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJobTracker,
  initializeJobTracker,
  IUpdateTrackerPositionProps,
  updateTrackerPosition,
} from "@/action/tracker";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { EmptyContent } from "../empty-content";
import { toast } from "sonner";

import dynamic from "next/dynamic";
import DndTracker from "./components/dnd-tracker";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { ITrackerData } from "@/types/tracker";
import { DropColumn } from "./components/drop-column";

const DNDTrackerWrapper = dynamic(
  () =>
    import("./components/dnd-tracker-wrapper").then(
      (module) => module.DNDTrackerWrapper,
    ),
  {
    ssr: false,
  },
);

export function JobTracker() {
  const queryClient = useQueryClient();
  const [data, setData] = useState<ITrackerData | null | undefined>();
  const [optimisticData, setOptimisticData] = useOptimistic(data);

  const {
    data: jobTrackerData,
    error,
    isLoading: isTrackerLoading,
  } = useQuery({
    queryKey: ["job-tracker-data"],
    queryFn: async () => {
      return await getJobTracker();
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: addJobTracker, isPending: isTrackerGettingInitialized } =
    useMutation({
      mutationKey: ["initialize-job-tracker"],
      mutationFn: () => {
        return initializeJobTracker();
      },

      onSettled: async (data) => {
        if (data?.error) {
          toast.error(`Failed to initialize job tracker. Please try again!`);
        } else {
          await queryClient.invalidateQueries({
            queryKey: ["job-tracker-data"],
          });
          toast.success(`Job tracker initialized successfully!`);
        }
      },
    });
  const {
    mutate: updateTrackerPositionMutate,
    isPending: isTrackerPositionUpdating,
  } = useMutation({
    mutationKey: ["move-tracker-position"],
    mutationFn: (params: IUpdateTrackerPositionProps) => {
      return updateTrackerPosition({ ...params });
    },

    onSettled: async (data) => {
      if (data?.error) {
        toast.error(`Failed to update tracker position. Please try again!`);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["job-tracker-data"],
        });
        toast.success(`${data?.message}`);
      }
    },
  });

  useEffect(() => {
    startTransition(() => {
      setOptimisticData(jobTrackerData?.trackerData);
      setData(jobTrackerData?.trackerData);
    });
  }, []);

  if (isTrackerLoading || isTrackerGettingInitialized) {
    return <ContainerWithSpinner />;
  }
  if (jobTrackerData?.error) {
    return <div>Oops. Something went wrong please try again</div>;
  }

  if (!jobTrackerData?.trackerData || !data) {
    return (
      <EmptyContent
        title="No Tracker Added "
        description="Get started on tracking your job applications by creating a job tracker."
        buttonContent="Create New Tracker"
        buttonProps={{
          onClick: () => {
            addJobTracker();
          },
        }}
      />
    );
  }

  return (
    <>
      {optimisticData && (
        <>
          <div className="flex gap-5 items-center mb-10">
            <h2 className=" text-3xl font-semibold ">Job Tracker</h2>
            {isTrackerPositionUpdating && (
              <ContainerWithSpinner
                parentProps={{ className: "w-fit! h-fit!" }}
                spinnerProps={{ className: " size-6!" }}
              />
            )}
          </div>
          <DNDTrackerWrapper>
            <DndTracker>
              {(jobTrackerColumns) => {
                return jobTrackerColumns.map((section) => {
                  const currentSection = data?.sectionList?.[section.id];
                  return (
                    <DropColumn
                      key={section.id}
                      id={section.id}
                      label={section.label}
                      currentSection={currentSection}
                      trackerData={optimisticData}
                      setOptimisticData={setOptimisticData}
                      setData={setData}
                      updateTrackerPositionMutate={updateTrackerPositionMutate}
                    />
                  );
                });
              }}
            </DndTracker>
          </DNDTrackerWrapper>
        </>
      )}
    </>
  );
}
