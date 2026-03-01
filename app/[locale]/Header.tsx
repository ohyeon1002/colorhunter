"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Header({
  locale,
  session,
}: {
  locale: string;
  session: Session | null;
}) {
  const t = useTranslations("Header");
  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <header className="navbar flex w-screen md:px-10 flex-row z-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 md:size-10 text-neutral">
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            onClick={closeDropdown}
            className="menu min-w-max menu-sm md:menu-xl dropdown-content bg-neutral-content rounded-md">
            <li>
              <Link href="/">{t("left.0")}</Link>
            </li>
            <li>
              <a>{t("left.1")}</a>
            </li>
            <li>
              <a>{t("left.2")}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center text-4xl font-bold text-primary-content">
        <Link href="/">Let's Hunt Color</Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 md:size-10 text-neutral">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            onClick={closeDropdown}
            className="menu min-w-max menu-sm md:menu-xl dropdown-content bg-neutral-content rounded-md">
            {session ? (
              <>
                <li>
                  <a>{t("right.mypage")}</a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: `/${locale}` })
                    }>
                    {t("right.signout")}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin" className="click:dropdown-close">
                    {t("right.signin")}
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="click:dropdown-close">
                    {t("right.signup")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
