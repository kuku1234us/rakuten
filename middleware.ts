import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Update the matcher to catch all routes
  matcher: [
    // Match the root path
    "/",
    // Match all paths that don't start with api, _next, etc.
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
