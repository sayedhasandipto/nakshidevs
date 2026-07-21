import { NextRequest, NextResponse } from "next/server";

// ─── Route Protection Middleware ────────────────────────────────────────────
// ALL routes are protected by default. Only public paths listed below
// can be accessed without authentication.

// Routes that DON'T require login
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/api/auth",        // Better Auth API endpoints
];

function getSessionToken(request: NextRequest): string | undefined {
  return (
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value
  );
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = getSessionToken(request);
  const isAuthenticated = !!sessionToken;

  // Allow public paths without auth
  if (isPublicPath(pathname)) {
    // If user is already logged in and tries to access login/signup, redirect to home
    if (
      isAuthenticated &&
      (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Block all other routes if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes EXCEPT Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
