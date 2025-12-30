"use server";
import { db } from "@/firebase/firebase-client";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { getID } from "@/lib/get-id";
import { ResumeOutputType } from "@/modules/resume-editor/components/sidebar/schema";
import dayjs from "dayjs";

export interface IAddResumeProps {
  resumeId: string;
  userId: string;
  resume: ResumeOutputType;
}

export async function addResume({ resume, resumeId, userId }: IAddResumeProps) {
  const createdAt = dayjs();
  await setDoc(
    doc(collection(db, "userResumes", userId, "allResume"), resumeId),
    {
      ...resume,
      createdAt: createdAt.toString(),
      id: resumeId,
      name: `New Resume ${createdAt.format("YYYY-MM-DD")}`,
    }
  );
}
