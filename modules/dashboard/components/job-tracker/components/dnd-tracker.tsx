import React from "react";

const jobTrackerColumns = [
  { id: "applied", label: "Applied" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
] as const;
export default function DndTracker({
  children,
}: {
  children: (value: typeof jobTrackerColumns) => React.ReactNode;
}) {
  return (
    <div className=" w-full h-full flex gap-4 ">
      {children(jobTrackerColumns)}
    </div>
  );
}
