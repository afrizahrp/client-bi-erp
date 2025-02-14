'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryListTable } from './category-list-table';
import { CategoryColumns } from './category-list-table/components/columns';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { routes } from '@/config/routes';

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
  const [categories, setCategories] = useState<CategoryColumns[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            params: {
              company_id: 'BIS',
            },
          }
        );

        const formattedCategories: CategoryColumns[] = response.data.map(
          (item: any) => ({
            type: item.type,
            categoryType: item.categoryType.name,
            id: item.id,
            name: item.name,
            iStatus: item.iStatus,
            status: item.status?.name,
            // remarks: item?.remarks,
            // images: item.images.map((image: any) => image.imageURL),
          })
        );

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div>
        <Card className='mt-6'>
          <CardContent className='p-10'>
            <CategoryListTable data={categories} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryListPage;
