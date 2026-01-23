import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./firebase/firebase-server";

const PROTECTED_ROUTES = ["/dashboard", "/resume"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathName.startsWith(route),
  );
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
    return;
  }

  try {
    await auth.verifySessionCookie(sessionCookie);

    if (!isProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return;
  } catch (error) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/"],
};
