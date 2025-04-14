import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Await params before using
  const { locale } = await params;

  // Redirect to locale-prefixed dashboard route
  redirect(`/${locale}/dashboard`);
}

// Client component for the title with translations
export function HomeTitle() {
  const ct = useTranslations("Common");
  const mt = useTranslations("meta");

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{ct("welcome")}</h1>
      <p className="text-lg text-muted-foreground">{mt("description")}</p>
    </>
  );
}
