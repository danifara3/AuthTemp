import NextAuth, { User as NextAuthUser } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prismaUtil";
import { connectToDatabase } from "@/app/common/server-helpers";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

// the options are imported
// const handler = NextAuth(AuthOptions);
// export {handler as GET, handler as POST}
// Define the User type

// Define the User type
export interface user {
  id: string;
  email: string;
  name?: string | null;
  address?: string;
}

export const AuthOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith@x.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          await connectToDatabase();

          const tempUser = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!tempUser || !tempUser.hashedPassword) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            tempUser.hashedPassword
          );

          if (isPasswordCorrect) {
            // Exclude hashedPassword from the user object
            const { hashedPassword, ...verifiedUser } = tempUser;
            console.log("Returned data:", verifiedUser);

            return verifiedUser as user;
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],

  // callbacks
  // to get more data in your session

  callbacks: {
    async jwt({ token, user, session,trigger }) {
      console.log("jwt callback", { token, user, session });
     if(trigger === "update"&& session?.name){
      token.name = session.name;
     }
      if (user) {
        const extendedUser = user as user;
        return {
          ...token,
          id: extendedUser.id,
          address: extendedUser.address,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
          name: token.name,
        },
      };
    },
  },

  // secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/loginsignup",
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
