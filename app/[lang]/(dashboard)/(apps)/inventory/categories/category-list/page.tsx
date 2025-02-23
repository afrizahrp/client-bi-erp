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
  // const { data: session } = useSession();
  const { session } = useAuth();

  const company_id = session?.user?.company_id?.trim().toUpperCase() || ''; // Ambil company_id dari sesi dan konversi ke huruf besar

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
          status: category.status,
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

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
        {/* <div className='flex justify-between items-center mt-4'>
          <div className='text-xs'>Total Records: {total}</div>
        </div> */}
      </div>
    </>
  );
};

export default CategoryListPage;
