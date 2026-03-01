"use client";

import { useTranslations } from "next-intl";
import authenticate from "./actions";
import { useActionState } from "react";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Sign({ params }: Props) {
  const t = useTranslations("Signin");
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <form action={formAction}>
      <fieldset className="flex w-xs md:w-lg h-lg p-4 flex-col bg-base-200 border-base-300 rounded-box border">
        <p className="fieldset-legend">{t("signin")}</p>

        <label className="label">{t("email")}</label>
        <input
          name="email"
          type="email"
          className="input md:w-lg"
          placeholder={t("email")}
        />

        <label className="label">{t("pw")}</label>
        <input
          name="pw"
          type="password"
          className="input md:w-lg"
          required
          placeholder={t("pw")}
        />

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-neutral mt-4">
          {isPending ? t("pending") : t("signin")}
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="divider"></div>
        <button type="button" className="btn btn-soft btn-neutral">
          <Link href="/signup">{t("signup")}</Link>
        </button>
      </fieldset>
    </form>
  );
}
