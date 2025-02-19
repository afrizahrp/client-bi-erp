import { BACKEND_URL } from '@/lib/Constants';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import avatar3 from '@/public/images/avatar/avatar-3.jpg';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log('refreshed');

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptionsNextAuth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
        // company_id: { label: 'Company ID', type: 'text' },
      },
      async authorize(credentials, req) {
        if (
          !credentials?.name ||
          !credentials?.password
          // ||!credentials?.company_id
        )
          return null;
        const { name, password } = credentials;
        const res = await fetch(BACKEND_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            name,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),

    CredentialsProvider({
      name: 'Register',
      credentials: {
        name: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
        // company_id: { label: 'Company ID', type: 'text' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials, req) {
        if (
          !credentials?.name ||
          !credentials?.email ||
          !credentials?.password
          // !credentials?.company_id ||
        )
          return null;
        const { name, password, email } = credentials;
        const res = await fetch(BACKEND_URL + '/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name,
            password,
            // company_id,
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptionsNextAuth);

export { handler as GET, handler as POST };
