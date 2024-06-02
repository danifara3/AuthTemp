import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      address?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    address?: string;
  }
}
