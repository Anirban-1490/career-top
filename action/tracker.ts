"use server";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { checkUser } from "./user-profile";
import { db } from "@/firebase/firebase-client";
import { createFirestoreConverter } from "@/lib/firebase";
import { IJobCardData, ITrackerData, Tracker } from "@/types/tracker";

export interface IUpdateTrackerPositionProps {
  trackerId: string;
  prevTracker: Tracker;
  nextTracker: Tracker;
}

export async function initializeJobTracker() {
  const user = await checkUser();
  try {
    await setDoc(doc(db, "job-tracker", user.uid), {
      jobCardList: [],
      sectionList: {
        applied: { id: "applied", label: "Applied", jobCardsPosition: [] },
        interviewing: {
          id: "interviewing",
          label: "Interviewing",
          jobCardsPosition: [],
        },
        offer: { id: "offer", label: "Offer", jobCardsPosition: [] },
        rejected: { id: "rejected", label: "Rejected", jobCardsPosition: [] },
      },
    });
    return {
      error: null,
      message: "Job tracker intialized successfully",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}
export async function addJobTracker(
  jobCardData: IJobCardData,
  tracker: Tracker,
  id: string,
) {
  const user = await checkUser();
  const sectionListKey = `sectionList.${tracker}.jobCardsPosition`;

  try {
    await updateDoc(
      doc(db, "job-tracker", user.uid).withConverter(
        createFirestoreConverter<ITrackerData>(),
      ),
      {
        [`jobCardList.${id}`]: jobCardData,
        [sectionListKey]: arrayUnion(id),
      },
    );
    return {
      error: null,
      message: "Tracker added successfully",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}

export async function updateTrackerPosition({
  trackerId,

  prevTracker,
  nextTracker,
}: IUpdateTrackerPositionProps) {
  const user = await checkUser();
  const prevSectionListKey = `sectionList.${prevTracker}.jobCardsPosition`;
  const nextSectionListKey = `sectionList.${nextTracker}.jobCardsPosition`;

  try {
    await updateDoc(
      doc(db, "job-tracker", user.uid).withConverter(
        createFirestoreConverter<ITrackerData>(),
      ),
      {
        [prevSectionListKey]: arrayRemove(trackerId),
        [nextSectionListKey]: arrayUnion(trackerId),
      },
    );
    return {
      error: null,
      message: "Tracker position updated successfully",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}

export async function getJobTracker() {
  const user = await checkUser();
  try {
    const data = await getDoc(
      doc(db, "job-tracker", user.uid).withConverter(
        createFirestoreConverter<ITrackerData>(),
      ),
    );
    return {
      trackerData: data.data(),
      error: null,
      message: "Success",
    };
  } catch (error) {
    return {
      trackerData: null,
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}
