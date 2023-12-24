import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth: (auth, req) => {
    if (auth.userId && auth.isPublicRoute) {
      let path = "select-org";
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }
      const orgUrl = new URL(path, req.url);
      return NextResponse.redirect(orgUrl);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSel = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSel);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
