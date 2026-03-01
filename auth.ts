import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { users } from "./db/schema";
import { db } from "./db";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

async function getUser(email: string): Promise<User | undefined> {
  console.log("Searching for email:", email);
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Credentials:", credentials);
        const parsedCredentials = z
          .object({ email: z.email(), pw: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, pw: password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password!);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
