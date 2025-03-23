import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Lütfen email ve şifrenizi girin');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/Login`, {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: credentials.email,
            password: credentials.password,
            rememberMe: true
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Kullanıcı adı veya şifre hatalı');
        }

        if (data.status === 0 && data.data) {
          return {
            id: "1",
            email: credentials.email,
            name: "Kullanıcı",
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 