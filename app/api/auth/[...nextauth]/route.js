import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import connectMongoDB from "@/app/lib/mongoDB";
import { NextResponse } from "next/server";

const MAX_AGE = 5 * 60;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();
        const filter = { email: credentials?.email, role: "user" };
        const user = await User.findOne(filter);

        if (!user) throw new Error("Wrong Email or Not Authorized as User");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!passwordMatch) throw new Error("Wrong Password");

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
      async profile(profile) {
        await connectMongoDB();
        let user = await User.findOne({
          email: profile.email,
          role: "admin",
        });

        if (!user) {
          NextResponse.json(
            { error: "Not Authorized as Admin. Contact Support." },
            { status: 401 },
          );
          throw new Error("Not Authorized as Admin. Contact Support.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },
  jwt: {
    maxAge: MAX_AGE,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.googleAccessToken = account.access_token;
        console.log("Account Info:",  );
      }
      if (user) {
        token.id = user.id; 
        token.role = user.role;
        token.exp = Math.floor(Date.now() / 1000) + MAX_AGE;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.googleAccessToken = token.googleAccessToken;
        session.user.id = token.id;
        session.user.role = token.role;
      }
      // set session expiry from token if present
      if (token.exp) {
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
  },
  signOut: "/",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
