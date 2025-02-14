import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios.config';

export const useCategories = (company_id: string) => {
  const { data, isLoading, error, ...rest } = useQuery<any[], Error>({
    queryKey: ['categories', company_id],
    queryFn: () =>
      api
        .get('/categories', {
          params: { company_id },
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

  return { data, isLoading, error, ...rest };
};

export default useCategories;
