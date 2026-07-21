import { NextRequest, NextResponse } from "next/server";

// ─── Protected & Auth Routes ───────────────────────────────────────────────
// We check for the Better Auth session cookie to decide whether to redirect.
// The cookie name matches Better Auth's default: "better-auth.session_token"
// (or "__Secure-better-auth.session_token" in production HTTPS).

const PROTECTED_PATHS = ["/dashboard"];
const AUTH_PATHS = ["/auth/login", "/auth/signup"];

function getSessionToken(request: NextRequest): string | undefined {
  // Check both the secure (https) and non-secure (http dev) cookie names
  return (
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = getSessionToken(request);
  const isAuthenticated = !!sessionToken;

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-authenticated users away from login/signup
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on protected + auth routes only (skip _next, api, static)
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
