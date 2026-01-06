"use server";

import { db } from "@/firebase/firebase-client";
import { ResumeOutputType } from "@/modules/resume-editor/components/sidebar/schema";
import {
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { keyof } from "zod";

export async function deleteResumeSection(
  filteredData: any,
  fieldId: string,
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
