"use server";

import { db } from "@/firebase/firebase-client";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

export async function getResume(userId: string, resumeId: string) {
  const q = query(
    collection(db, "userResumes", userId, "allResume"),
    where("id", "==", resumeId)
  );

  return (await getDocs(q)).docs.map((doc) => doc.data());
}
