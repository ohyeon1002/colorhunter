"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function authenticate(
  state: string | undefined,
  formData: FormData,
) {
  try {
    formData.append("redirectTo", "/");
    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw e;
  }
}
