import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { api } from '@/config/axios.config';

export const useCategories = () => {
  const { data: session } = useSession();

  const company_id =  session?.user?.company_id.toUpperCase().trim();
  const page = 1;
  const limit = 100;

  const { data, isLoading, error, ...rest } = useQuery<any[], Error>({
    queryKey: ['categories', company_id, page, limit],
    queryFn: () =>
      api
        .get('/categories', {
          params: { company_id, page, limit },
        })
        .then((res) =>
          res.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            categoryType: item.categoryType?.name,
            iStatus: item.iStatus,
            status: item.status?.name,
            remarks: item?.remarks,
          }))
        ),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

console.log('categories hooks', data);

  return { data, isLoading, error, ...rest };
};

export default useCategories;
