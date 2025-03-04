import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios.config';

interface Category {
  id: string;
  name: string;
  categoryType: string;
  status: string;
  remarks?: string | null;
}

interface CategoriesResponse {
  data: Category[];
  total: number;
}

export const useCategories = (
  company_id: string,
  page: number,
  limit: number
  // token: string
) => {
  const { data, isLoading, error, ...rest } = useQuery<
    CategoriesResponse,
    Error
  >({
    queryKey: ['categories', company_id, page, limit],
    queryFn: () => {
      return api
        .get<CategoriesResponse>('/categories', {
          params: { company_id, page, limit },
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        })
        .then((res) => res.data);
    },
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  return { data: data?.data, total: data?.total, isLoading, error, ...rest };
};

export default useCategories;
