import { IJobCardData, Tracker } from "@/types/tracker";
import dayjs from "dayjs";
import { Clock, Link as LinkIcon } from "lucide-react";
import { useDrag } from "react-dnd";
import Link from "next/link";

interface IJobCardProps {
  id: string;
  cardData?: IJobCardData;
  trackerType: Tracker;
}

export function JobCard({ id, cardData, trackerType }: IJobCardProps) {
  const [{ draggedItem }, ref] = useDrag(() => ({
    type: "job-card",
    item: { id, trackerType },
    collect(monitor) {
      return {
        draggedItem: monitor.getItem(),
      };
    },
  }));

  return (
    <div
      ref={(node) => {
        if (node == null) return;
        ref(node);
      }}
      className="py-4 px-5 bg-secondary border-accent-neon-red  rounded-md border text-white"
      key={id}
    >
      <h4 className="font-semibold capitalize">
        {cardData?.role || "Unnamed Job"}
      </h4>
      <p className=" capitalize">
        {cardData?.companyName || "Company not specified"}
      </p>
      <div className=" flex items-center gap-2 h-fit mt-5">
        <Clock className=" size-4" />
        <p className=" text-sm ">
          {dayjs(cardData?.updatedAt as string).format("MM/DD/YYYY")}
        </p>
        {cardData?.jobUrl && (
          <Link
            target="_blank"
            href={cardData?.jobUrl || ""}
            className="ml-auto"
          >
            <LinkIcon className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
