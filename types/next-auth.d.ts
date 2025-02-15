import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  roleId: string;
  image: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  role_id: string;
  company_id: string;
  branch_id: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
