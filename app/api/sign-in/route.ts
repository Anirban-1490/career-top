import { appServer, auth } from "@/firebase/firebase-server";
import dayjs from "dayjs";

import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const expiresIn = 10 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  const { idToken } = (await request.json()) as { idToken: string };

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: expiresIn * 1000,
  });

  try {
    (await cookies()).set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    // const newError = structuredClone(error) ;

    return Response.json(
      { error, message: "Unexpected Server Error" },
      { status: 500 }
    );
  }
}
