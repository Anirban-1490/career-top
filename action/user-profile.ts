"use server";

import { auth } from "@/firebase/firebase-server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function UserProfile() {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) throw new Error();
    const claim = await auth.verifySessionCookie(sessionCookie);

    return claim;
  } catch (error) {
    return null;
  }
}

export async function checkUser() {
  const user = await UserProfile();
  if (!user) redirect("/sign-up");
  return user;
}
