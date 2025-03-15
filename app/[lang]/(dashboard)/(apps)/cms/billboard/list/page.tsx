'use client';
import React, { useEffect, useState } from 'react';
import { BillboardListTable } from './list-table/components';
import { BillboardColumn } from './list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import useBillboard from '@/queryHooks/useBillboard';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Billboard List',
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

const BillboardListPage = () => {
  const { data, isFetching, error } = useBillboard();

  if (isFetching && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching billboards: {error.message}</div>;
  }

  console.log('Billboard data:', data); // Debugging log

  const formattedBillboard: BillboardColumn[] =
    data?.map((item) => ({
      id: item.id,
      section: item.section.toString() || '0',
      description: item.name ?? '',
      title: item.title ?? '',
      iStatus: item.iStatus || ('' as string),
      iShowedStatus: item.iShowedStatus || ('' as string),
      remarks: item.remarks ?? '',
      isImage: item.isImage as boolean,
      contentURL: item.contentURL ?? '',
    })) ?? [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <BillboardListTable data={formattedBillboard} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BillboardListPage;
