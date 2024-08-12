// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    school: string | null; // Add the school field
  }

  interface Session {
    user: {
      role: string;
      school: string | null; // Add the school field
    } & DefaultSession["user"];
  }
}
