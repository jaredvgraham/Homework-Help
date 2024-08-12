import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

// Define custom types for the session and user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      provider?: string;
      providerId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    providerId?: string;
  }
}
