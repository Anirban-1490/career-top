import { TrackerDialog } from "./tracker-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import { IDragableTrackerProps, ITrackerData, Tracker } from "@/types/tracker";
import { JobCard } from "./job-cards";
import { Dispatch, SetStateAction, startTransition } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { IUpdateTrackerPositionProps } from "@/action/tracker";

export function DropColumn({
  id,
  label,
  setOptimisticData,
  currentSection,
  trackerData,
  setData,
  updateTrackerPositionMutate,
}: {
  id: Tracker;
  label: string;
  currentSection: ITrackerData["sectionList"][Tracker];
  trackerData: ITrackerData;
  setOptimisticData: Dispatch<SetStateAction<ITrackerData | null | undefined>>;
  setData: Dispatch<SetStateAction<ITrackerData | null | undefined>>;
  updateTrackerPositionMutate: UseMutateFunction<
    {
      error: unknown;
      message: string;
    },
    Error,
    IUpdateTrackerPositionProps,
    unknown
  >;
}) {
  const [_, drop] = useDrop<IDragableTrackerProps>(
    () => ({
      accept: "job-card",
      drop: (item, monitor) => {
        const prevSectionCardList = trackerData.sectionList[
          item.trackerType
        ].jobCardsPosition.filter((id) => id != item.id);

        const currentSectionCardList =
          trackerData.sectionList[id].jobCardsPosition;

        const newTrackerData: ITrackerData = {
          ...trackerData,
          sectionList: {
            ...trackerData.sectionList,
            [item.trackerType]: {
              ...trackerData.sectionList[item.trackerType],
              jobCardsPosition: prevSectionCardList,
            },
            [id]: {
              ...trackerData.sectionList[id],
              jobCardsPosition: [...currentSectionCardList, item.id],
            },
          },
        };

        startTransition(() => {
          setOptimisticData({ ...newTrackerData });
        });
        updateTrackerPositionMutate({
          nextTracker: id,
          prevTracker: item.trackerType,
          trackerId: item.id,
        });
        setData({ ...newTrackerData });
      },
      collect(monitor) {
        return {
          isOver: !!monitor.isOver(),
          getItem: monitor.getItem(),
        };
      },
    }),
    [trackerData],
  );

  return (
    <div
      className=" basis-full rounded-md bg-accent-neon-red-300 flex flex-col h-full"
      key={id}
      ref={drop}
    >
      <div className="p-6 flex justify-between items-center">
        <h3 className=" font-semibold">{label}</h3>
        <TrackerDialog trackerType={id}>
          <Button>
            <Plus />
          </Button>
        </TrackerDialog>
      </div>
      <div
        style={{ scrollbarGutter: "stable" }}
        className="pl-3 pr-2 pb-22 mt-10 flex flex-col gap-6 overflow-auto h-full"
      >
        {currentSection?.jobCardsPosition.map((cardId) => {
          const cardData = trackerData?.jobCardList?.[`${cardId}`];

          return (
            <JobCard
              trackerType={id}
              id={cardId}
              key={cardId}
              cardData={cardData}
            />
          );
        })}
      </div>{" "}
    </div>
  );
}
