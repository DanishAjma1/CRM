import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Not logged in
    if (!token) {
      return NextResponse.redirect(
        new URL("/authentication/client/login")
      );
    }

    // Admin-only route
    if (pathname.startsWith("/dashboard/admin-dashboard")) {
      if (token.role !== "admin") {
        return NextResponse.redirect(
          new URL("/dashboard", req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
