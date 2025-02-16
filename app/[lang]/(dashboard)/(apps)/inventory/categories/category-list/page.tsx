'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryListTable } from './category-list-table';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import useCategories from '@/queryHooks/useCategories';
import LayoutLoader from '@/components/layout-loader';

interface CategoryColumns {
  id: string;
  name: string;
  type: number;
  categoryType: string;
  iStatus: number;
  status: string;
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useCategories(page, limit);

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <CategoryListTable data={data?.data as CategoryColumns[]} />
            <div className="pagination">
              <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                Previous
              </button>
              <span>
                Page {page} of {Math.ceil(data?.total / limit)}
              </span>
              <button onClick={() => setPage((prev) => prev + 1)}>
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryListPage;