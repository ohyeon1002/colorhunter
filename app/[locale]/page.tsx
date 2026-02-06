import { getTranslations } from "next-intl/server";
import HomeClient from "./HomeClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="flex h-screen flex-col justify-center items-center">
      <HomeClient locale={locale} />
    </main>
  );
}
