import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
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
  const session = await auth();
  const { locale } = await params;
  return (
    <>
      <HomeClient locale={locale} session={session} />
    </>
  );
}
