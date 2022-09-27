import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

//* database *//
import { checkUserEmailPassword } from "../../../database/dbUsers";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        return await checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            break;
          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
