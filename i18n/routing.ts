import { defineRouting } from "next-intl/routing";
import { getAvailableLocales, getDefaultLocale } from "./language-config";

// Get locales and default locale from configuration file
export const locales = getAvailableLocales();

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: getDefaultLocale(),
});
