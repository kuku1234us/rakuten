"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Common");

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="flex items-center">
        {theme === "dark" ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        )}
        {theme === "dark" ? t("lightMode") : t("darkMode")}
      </span>
    </DropdownMenuItem>
  );
}

// Standalone version of the theme toggle (not used in dropdown)
export function StandaloneThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Common");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
