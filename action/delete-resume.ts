"use server";

import { db } from "@/firebase/firebase-client";
import { ResumeOutputType } from "@/modules/resume-editor/components/sidebar/schema";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { keyof } from "zod";

export async function deleteFullResume() {}

export async function deleteResumeSection(
  filteredData: any,
  fieldId: string,
  resumeId: string,
  userId: string,
  field: keyof ResumeOutputType
) {
  //   const q = query(
  //     collection(db, "userResumes", userId, "allResume"),
  //     where("id", "==", resumeId)
  //   );
  console.log(field, filteredData);

  const docRef = doc(db, "userResumes", userId, "allResume", resumeId);

  await updateDoc(docRef, {
    [field]: filteredData,
  });
}
