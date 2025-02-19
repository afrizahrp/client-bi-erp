import { Backend_URL } from '@/lib/Constants';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import avatar3 from '@/public/images/avatar/avatar-3.jpg';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.refreshToken}`,
    },
  });
  console.log('refreshed');

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
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
        const res = await fetch(Backend_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            name,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Login response status:', res.status);

        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        console.log('Login successful:', user);

        return {
          ...user,
          accessToken: user.accessToken,
          expiresIn: new Date().getTime() + 3600 * 1000, // Example expiration time
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;

      // session.backendTokens = token.backendTokens;

      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
