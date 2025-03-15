'use client';
import React from 'react';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';
import { Card, CardContent } from '@/components/ui/card';
import { useGetOneBillboard } from '@/queryHooks/useGetOneBillboard';
import { BillboardForm } from './components/billboard-form';
import LayoutLoader from '@/components/layout-loader';

const BillboardPage = ({ params }: { params: { id: string } }) => {
  const { data, isFetching, error } = useGetOneBillboard(params.id);

  if (isFetching && !data) {
    return (
      <div>
        <LayoutLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching billboard: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const pageHeader = {
    title: data ? 'Edit Billboard' : 'New Billboard',
    breadcrumb: [
      {
        name: 'List',
        href: routes.cms.billboards,
      },
      {
        name: data ? 'Edit Billboard' : 'New Billboard',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Card className='py-6'>
        <CardContent>
          <BillboardForm initialBillboardData={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default BillboardPage;
