import { appServer, auth } from "@/firebase/firebase-server";
import dayjs from "dayjs";

import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const expiresIn = dayjs().add(10, "days");
const expireInMili = expiresIn.diff(dayjs()).toFixed();

export async function POST(request: NextRequest) {
  const { idToken } = (await request.json()) as { idToken: string };
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: +expireInMili,
  });

  try {
    (await cookies()).set("session", sessionCookie, {
      maxAge: +expireInMili / 1000,
      httpOnly: true,
      secure: true,
      sameSite: true,
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
