'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryListTable } from './list-table';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import useCategory from '@/queryHooks/useCategory';
import LayoutLoader from '@/components/layout-loader';

interface CategoryColumns {
  id: string;
  name: string;
  categoryType: string;
  slug: string | null;
  iStatus: string;
  imageURL: string;
  remarks?: string;
  iShowedStatus: string;
}

interface CategoryListContentProps {
  session: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryListContent: React.FC<CategoryListContentProps> = ({
  session,
  page,
  setPage,
  limit,
  setLimit,
}) => {
  const company_id = session?.user?.company_id?.trim().toUpperCase() || '';

  const { data, total, isFetching, error } = useCategory(
    company_id,
    page,
    limit
  );

  if (!data && isFetching) {
    return <LayoutLoader />;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  // **Transformasi Data**
  const categories: CategoryColumns[] = (data ?? []).map((category) => ({
    id: category.id.trim(),
    name: category.name.trim(),
    categoryType: category.categoryType,
    slug: category.slug ?? null,
    iStatus: category.iStatus,
    imageURL: category.imageURL,
    remarks: category.remarks?.trim() ?? '',
    iShowedStatus: category.iShowedStatus,
  }));

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
            {/* Loader hanya muncul saat fetch baru */}
            {isFetching && <div className='text-center'>Fetching data...</div>}

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

export default CategoryListContent;
