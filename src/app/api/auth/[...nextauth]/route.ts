import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prismaUtil";
import { connectToDatabase } from "@/app/common/server-helpers";
import bcrypt from "bcrypt";

// the options are imported
// const handler = NextAuth(AuthOptions);
// export {handler as GET, handler as POST}
// Define the User type

// Define the User type
interface User {
  id: string;
  email: string;
  name: string | null;
}

export const AuthOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages:{
    signIn:'/loginsignup',
  },
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

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (isPasswordCorrect) {
            // Exclude hashedPassword from the user object
            const { hashedPassword, ...verifiedUser } = user;
            console.log("Returned data:",verifiedUser);
            
            return verifiedUser as User;
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
