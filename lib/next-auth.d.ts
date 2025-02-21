import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      role_id: string;
      image: string;
      company_id: string;
    };
    // backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    // };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      role_id: string;
      image: string;
      company_id: string;
    };

    // accessToken: string;
    // refreshToken: string;
    // expiresIn: number;
    // refreshToken: string;
    // backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    // };
  }
}
