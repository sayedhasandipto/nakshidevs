import { NextRequest, NextResponse } from "next/server";

// ─── Route Protection Middleware ────────────────────────────────────────────
// Only specific routes like dashboard require authentication.
// Public routes can be accessed freely.

// Routes that require login
const PROTECTED_PATHS = [
  "/dashboard",
];

function getSessionToken(request: NextRequest): string | undefined {
  return (
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value
  );
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = getSessionToken(request);
  const isAuthenticated = !!sessionToken;

  // Enforce auth only for protected routes
  if (isProtectedPath(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Redirect authenticated users away from authentication pages to home
  if (
    isAuthenticated &&
    (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes EXCEPT Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

