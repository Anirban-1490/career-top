"use server";

import { db } from "@/firebase/firebase-client";
import { ajlib } from "@/lib/arcjet";
import { collection, getDocs } from "firebase/firestore";

export async function getResumes(userId: string) {
  await ajlib({
    config: {
      userId,
    },
  });

  const docs = await getDocs(
    collection(db, "userResumes", userId, "allResume")
  );

  return {
    docs: docs.docs.map((doc) => doc.data()),
  };
}
