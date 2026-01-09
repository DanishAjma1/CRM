import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "./mongoDB";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === undefined)
          throw new Error("No credentials provided");

        await connectMongoDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) throw new Error("Wrong Password");

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/pages/SignIn",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
