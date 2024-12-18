import { NextRequest, NextResponse } from "next/server";
import routes from "./routes";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-access-token"); // Supabase session token

  const protectedRoutes = ["/dashboard", "/profile"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = routes.auth.signIn;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
