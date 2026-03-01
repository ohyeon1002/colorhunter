import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSigninPage = nextUrl.pathname.startsWith("/signin");

      // 1. 로그인 페이지에 있을 때
      if (isOnSigninPage) {
        if (isLoggedIn) {
          // 이미 로그인했다면 홈(/)으로 보냅니다.
          return Response.redirect(new URL("/", nextUrl));
        }
        // 로그인 안 했다면 로그인 페이지에 그대로 둡니다.
        return true;
      }

      // 2. 그 외의 페이지 (예: 메인 페이지 등)
      // 여기서는 서비스의 성격에 따라 결정합니다.
      // 로그인이 필수인 서비스라면 여기서 false를 반환해 로그인창으로 보내야 합니다.
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
