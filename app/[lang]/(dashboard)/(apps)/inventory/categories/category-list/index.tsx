import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Sesuaikan path dengan konfigurasi next-auth Anda
import CategoryListPage from "@/app/[lang]/(dashboard)/(apps)/inventory/categories/category-list"; // Sesuaikan path dengan struktur folder Anda
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
}

import { Session } from "next-auth";

const Page = ({ session }: { session: Session }) => {
  return (
    <div>
      <CategoryListPage session={session} />
    </div>
  );
};

export default Page;