import languageConfig from "./language-config.json";

export interface LocaleConfig {
  code: string;
  displayName: string;
  nativeName: string;
  flag: string;
  isDefault: boolean;
  enabled: boolean;
  dateFormat: string;
  direction: "ltr" | "rtl";
}

export interface LanguageConfig {
  locales: LocaleConfig[];
  defaultLocale: string;
  fallbackLocale: string;
  routingStrategy: "prefix-except-default" | "prefix" | "no-prefix";
}

// Type assertion to ensure type safety
const typedConfig = languageConfig as LanguageConfig;

/**
 * Get all available locales
 */
export function getAvailableLocales(): string[] {
  return typedConfig.locales
    .filter((locale) => locale.enabled)
    .map((locale) => locale.code);
}

/**
 * Get locale configuration by code
 */
export function getLocaleConfig(code: string): LocaleConfig | undefined {
  return typedConfig.locales.find((locale) => locale.code === code);
}

/**
 * Get all enabled locale configurations
 */
export function getEnabledLocales(): LocaleConfig[] {
  return typedConfig.locales.filter((locale) => locale.enabled);
}

/**
 * Get default locale
 */
export function getDefaultLocale(): string {
  return typedConfig.defaultLocale;
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): boolean {
  return getAvailableLocales().includes(locale);
}

export default typedConfig;
