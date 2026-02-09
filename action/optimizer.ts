"use server";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AIOptimizer } from "./ai";
import { checkUser } from "./user-profile";
import { db } from "@/firebase/firebase-client";
import { getID } from "@/lib/get-id";
import { createFirestoreConverter } from "@/lib/firebase";
import { OptimizedResumeType } from "@/types/optimizer";
import dayjs from "dayjs";

export async function getUserOptimizedResumes() {
  const user = await checkUser();
  try {
    const docs = await getDocs(
      collection(
        db,
        "optimizedResumes",
        user.uid,
        "allOptimizedResumes",
      ).withConverter(createFirestoreConverter<OptimizedResumeType>()),
    );
    const optimizedResumes = docs.docs.map((doc) => doc.data());
    return {
      optimizedResumes: optimizedResumes,
      error: null,
      message: "Success",
    };
  } catch (error) {
    return {
      optimizedResumes: null,
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}

export async function getUserOptimziedResume(id: string) {
  const user = await checkUser();
  try {
    const data = await getDoc(
      doc(
        db,
        "optimizedResumes",
        user.uid,
        "allOptimizedResumes",
        id,
      ).withConverter(createFirestoreConverter<OptimizedResumeType>()),
    );
    return {
      optimizedResume: data.data(),
      error: null,
      message: "Success",
    };
  } catch (error) {
    return {
      optimizedResume: null,
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}

export async function optimizeResume(file: File) {
  const user = await checkUser();
  try {
    const analysis = await AIOptimizer(file);
    // console.log(analysis);

    if (!analysis.aiResponse) throw new Error("File processing failed!");
    const id = getID();

    await setDoc(
      doc(
        collection(db, "optimizedResumes", user.uid, "allOptimizedResumes"),
        id,
      ),
      {
        ...analysis,
        file: {
          size: file.size,
          name: file.name,
        },
        id,
        createdAt: dayjs().toString(),
        updatedAt: dayjs().toString(),
      },
    );
    return {
      error: "",
      message: "Successfully added document",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}

export async function deleteOptimizedResume(resumeId: string) {
  const user = await checkUser();
  try {
    await deleteDoc(
      doc(db, "optimizedResumes", user.uid, "allOptimizedResumes", resumeId),
    );
    return {
      error: null,
      message: "Successfully removed document",
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong. Please try again!",
    };
  }
}
