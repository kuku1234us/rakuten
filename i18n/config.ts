import {
  getAvailableLocales,
  getDefaultLocale,
  isValidLocale as configIsValidLocale,
} from "./language-config";

// Get locales and default locale from configuration file
export const locales = getAvailableLocales();
export const defaultLocale = getDefaultLocale();

// Define the Locale type based on the known possible values
export type Locale = string;
export type LocalePrefix = "always" | "as-needed" | "never";

export function isValidLocale(locale: string): locale is Locale {
  return configIsValidLocale(locale);
}
