"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  return <SessionProvider>{children}</SessionProvider>;



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
