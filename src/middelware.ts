import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-access-token"); // Supabase session token

  // List protected routes
  const protectedRoutes = ["/dashboard", "/profile"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      const url = request.nextUrl.clone();
      console.log("debug url");
      url.pathname = "/foo"; // Redirect to sign-in
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
