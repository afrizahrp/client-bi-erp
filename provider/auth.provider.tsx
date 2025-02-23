'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getSession,
  createSession,
  deleteSession,
  updateTokens,
  Session,
} from '@/lib/session';

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  const signOut = async () => {
    await deleteSession();
    setSession(null);
    window.location.assign('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ session, setSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;

// "use client";

// import { ReactNode } from "react";
// import { SessionProvider } from "next-auth/react";
// interface Props {
//   children: ReactNode;
// }

// const Providers = ({ children }: Props) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default Providers;
