import {
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
  },
  {
    publicPaths: ["/", "/api/public"],
  }
);

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
  ],
};
