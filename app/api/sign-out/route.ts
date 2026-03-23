import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get("session");
    if (!sessionCookie || !sessionCookie.value) {
      throw new Error("No session cookie found");
    }

    (await cookies()).delete("session");

    return NextResponse.json(
      { message: "Successfully signed out" },
      { status: 200 },
    );
  } catch (error) {
    // const newError = structuredClone(error) ;

    return Response.json(
      { error, message: "Unexpected Server Error" },
      { status: 500 },
    );
  }
}
