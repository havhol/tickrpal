import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import middlewareRoutes from "@/config/middlewareRoutes";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-nzwxckedbzcdndimnkcv-auth-token");

  const url = request.nextUrl.clone();

  // Block unauthenticated users from accessing protected routes
  if (
    middlewareRoutes.protected.some((route) => url.pathname.startsWith(route))
  ) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    // Validate token with Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login/signup pages
  if (middlewareRoutes.public.some((route) => url.pathname.startsWith(route))) {
    if (token) {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => request.cookies.getAll(),
          },
        }
      );

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
