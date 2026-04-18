import { TrackerType } from "@/modules/dashboard/components/job-tracker/schema";

export interface ITrackerData {
  jobCardList: IJobCardListData | null;

  sectionList: {
    applied: {
      id: "applied";
      label: "Applied";
      jobCardsPosition: string[];
    };
    interviewing: {
      id: "interviewing";
      label: "Interviewing";
      jobCardsPosition: string[];
    };
    offer: {
      id: "offer";
      label: "Offer";
      jobCardsPosition: string[];
    };
    rejected: {
      id: "rejected";
      label: "Rejected";
      jobCardsPosition: string[];
    };
  };
}

interface IJobCardListData {
  [key: string]: IJobCardData;
}
export interface IJobCardData extends TrackerType {
  tracker: Tracker;
  addedAt: string;
  updatedAt: string;
  id: string;
}

export type Tracker = "applied" | "interviewing" | "offer" | "rejected";

export interface IDragableTrackerProps {
  id: string;
  trackerType: Tracker;
}
