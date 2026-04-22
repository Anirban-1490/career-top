"use server";

import { auth } from "@/firebase/firebase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function UserProfile() {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return null;
  const claim = await auth.verifySessionCookie(sessionCookie);
  return claim;
}

export async function checkUser() {
  try {
    const user = await UserProfile();
    if (!user) redirect("/sign-up");
    return user;
  } catch (error) {
    redirect("/sign-up");
  }
}
