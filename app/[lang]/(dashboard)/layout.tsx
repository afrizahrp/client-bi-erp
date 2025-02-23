import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider';

import { getSession } from '@/lib/session';

import { redirect } from 'next/navigation';
import { getDictionary } from '@/app/dictionaries';

const layout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: any };
}) => {
  const session = await getSession();

  console.log(session);

  if (!session?.user?.name) {
    redirect('/auth/login');
  }

  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
