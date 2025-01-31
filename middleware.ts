import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Apply middleware only to protected routes
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Redirect to login if not authenticated
    },
  }
);

// Configure middleware to run on specific routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
