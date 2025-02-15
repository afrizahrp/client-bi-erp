'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryListTable } from './category-list-table';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import useCategories from '@/queryHooks/useCategories';
import LayoutLoader from '@/components/layout-loader';

interface CategoryColumns {
  id: string;
  name: string;
  type: string;
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

const CategoryListPage = ({ session }: { session: any }) => {
  const company_id = session?.user?.company_id; // Ambil company_id dari sesi
  const { data: categories = [], isLoading, error } = useCategories(company_id);

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
            <CategoryListTable data={categories as CategoryColumns[]} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryListPage;