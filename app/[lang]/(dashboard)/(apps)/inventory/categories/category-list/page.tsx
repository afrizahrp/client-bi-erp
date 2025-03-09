'use client';
import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import { useAuth } from '@/provider/auth.provider';

import { Card, CardContent } from '@/components/ui/card';
import { CategoryListTable } from './category-list-table';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import useCategories from '@/queryHooks/useCategories';
import LayoutLoader from '@/components/layout-loader';

interface CategoryColumns {
  id: string;
  name: string;
  categoryType: string;
  iStatus: string;
  remarks: string;
  // images: string[];
}

const pageHeader = {
  title: 'Category List',
  breadcrumb: [
    {
      name: 'Dashboard',
      href: routes.inventory.dashboard,
    },
    {
      name: 'List',
    },
  ],
};

const CategoryListPage = () => {
  const { session } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  if (!session) {
    return <LayoutLoader />;
  }

  return (
    <CategoryListPageContent
      session={session}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

interface CategoryListPageContentProps {
  session: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryListPageContent: React.FC<CategoryListPageContentProps> = ({
  session,
  page,
  setPage,
  limit,
  setLimit,
}) => {
  const company_id = session?.user?.company_id?.trim().toUpperCase() || '';

  const { data, total, isLoading, error } = useCategories(
    company_id,
    page,
    limit
  );

  const [categories, setCategories] = useState<CategoryColumns[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(
        data.map((category) => ({
          id: category.id.trim(),
          name: category.name.trim(),
          categoryType: category.categoryType,
          iStatus: category.iStatus,
          remarks: category.remarks?.trim() ?? '',
        }))
      );
    }
  }, [data]);

  if (isLoading && categories.length === 0) {
    return <LayoutLoader />;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  const totalPages = Math.ceil((total ?? 0) / limit);

  return (
    <>
      <PageHeader
        title='Category List'
        breadcrumb={[
          { name: 'Dashboard', href: routes.inventory.dashboard },
          { name: 'List' },
        ]}
      />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <CategoryListTable
              data={categories}
              currentPage={page}
              totalPages={totalPages}
              totalRecords={total}
              onPageChange={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryListPage;
