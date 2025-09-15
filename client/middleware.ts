import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;

  // Only protect dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard")) {
    const accessToken = cookies.get("accessToken")?.value;
    const refreshToken = cookies.get("refreshToken")?.value;

    console.log("🔒 Middleware cookies:", { accessToken, refreshToken });

    // No tokens → redirect to login
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Verify access token if exists
    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string);
        // Valid → allow access
        return NextResponse.next();
      } catch (err) {
        console.log("Access token expired or invalid:", err);
        // Invalid → frontend can handle refresh if refreshToken exists
        if (!refreshToken) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
        // Let frontend handle refresh
        return NextResponse.next();
      }
    }

    // No access token but refresh token exists → frontend should refresh
    return NextResponse.next();
  }

  // Unprotected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
