import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import routes from "./routes";

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("sb-access-token"); // Supabase session token

//   const protectedRoutes = ["/dashboard", "/profile"];

//   if (
//     protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
//   ) {
//     if (!token) {
//       const url = request.nextUrl.clone();
//       url.pathname = routes.auth.signIn;
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };
