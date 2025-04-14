import { AppSidebar } from "@/components/Navigation/app-sidebar";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Manage your application settings here.
        </p>
      </main>
    </div>
  );
}

// Client component for the title with translations
export function SettingsTitle() {
  const ct = useTranslations("Common");
  const st = useTranslations("Settings");

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{ct("settings")}</h1>
      <p className="text-lg text-muted-foreground">{st("preferences")}</p>
    </>
  );
}
