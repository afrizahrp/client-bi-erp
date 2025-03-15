'use client';
import React, { useState } from 'react';
import { useAuth } from '@/provider/auth.provider';
import LayoutLoader from '@/components/layout-loader';
import CategoryListContent from './category-list-content';

const CategoryListPage = () => {
  const { session } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  if (!session) {
    return <LayoutLoader />;
  }

  return (
    <CategoryListContent
      session={session}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

export default CategoryListPage;
