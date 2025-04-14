// We're using createSharedPathnamesNavigation to generate a
// type-safe navigation helper that uses the URL pathnames.
// This can help prevent broken links when using navigation.

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
