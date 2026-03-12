// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // ← tell NextAuth to use your custom page
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token as string;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // ← App Router requires this