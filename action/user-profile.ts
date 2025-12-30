"use server";

import { auth } from "@/firebase/firebase-server";
import { cookies } from "next/headers";

export async function UserProfile() {
  try {
    const sessionCookie = (await cookies()).get("session")?.value || "";
    const claim = await auth.verifySessionCookie(sessionCookie);

    return claim;
  } catch (error) {}
}
