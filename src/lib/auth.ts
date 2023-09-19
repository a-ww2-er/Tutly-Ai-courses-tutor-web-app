import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { prisma } from "./db";
import GoogleProvider from "next-auth/providers/google";
// here we declared the module for next-auth and added interface for the session
//which we extended the default session types from next-auth
declare module "next-auth" {
  interface Session extends DefaultSession {
    //since we overwrote the user object types but didnt declare type for each
    //variable we joined the object with the 'defaultSession ' user types coming from next-auth
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    credits: number;
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      //we're adding user id and user credit to our token
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }
      return token;
    },
    //the token parameter is what is returned from the jwt callback above
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
