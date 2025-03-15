'use client';
import React, { useState } from 'react';
import CategoryListContent from './category-list-content';

const CategoryListPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <CategoryListContent
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

export default CategoryListPage;
