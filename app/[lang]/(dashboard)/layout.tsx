import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { authOptions } from "@/lib/auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionaries";

const layout = async ({ children, params: { lang } }: { children: React.ReactNode; params: { lang: any } }) => {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session?.user?.name) {
    redirect("/auth/login");
  }

  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
