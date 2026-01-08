"use server";

import { db } from "@/firebase/firebase-client";
import { ResumeOutputType } from "@/modules/resume-editor/components/sidebar/schema";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function deleteResumeSection(
  filteredData: Record<string, unknown>[],
  resumeId: string,
  userId: string,
  field: keyof ResumeOutputType
) {
  const docRef = doc(db, "userResumes", userId, "allResume", resumeId);

  await updateDoc(docRef, {
    [field]: filteredData,
  });
}

export async function deleteResume(resumeId: string, userId: string) {
  const docRef = doc(db, "userResumes", userId, "allResume", resumeId);
  await deleteDoc(docRef);
}
