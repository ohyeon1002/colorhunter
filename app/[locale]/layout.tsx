import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "./Header";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hunt Color",
  description: "Hunt the color of a day and share your pics.",
  icons: {
    icon: "/colors.svg",
    apple: "/colors-256.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const session = await auth();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <div className="flex flex-col w-screen h-screen bg-linear-to-bl/increasing from-primary/70 to-secondary/70 overflow-hidden">
            <Header locale={locale} session={session} />
            <main className="flex flex-1 w-full flex-col justify-center items-center">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
