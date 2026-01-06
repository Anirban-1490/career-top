"use server";

import { db } from "@/firebase/firebase-client";
import { collection, getDocs } from "firebase/firestore";

export async function getResumes(userId: string) {
  const docs = await getDocs(
    collection(db, "userResumes", userId, "allResume")
  );

  return docs.docs.map((doc) => doc.data());
}
