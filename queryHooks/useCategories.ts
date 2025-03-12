import { api } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/auth.provider';
import { useModuleStore } from '@/store';

interface Category {
  id: string;
  name: string;
  categoryType: string;
  iStatus: string;
  imageURL: string;
  remarks?: string | null;
}

interface CategoriesResponse {
  data: Category[];
  totalRecords: number;
}

export const useCategories = (
  company_id: string,
  page: number,
  limit: number
) => {
  const { session } = useAuth();
  const companyId = session?.user?.company_id;
  const module_id = useModuleStore((state) => state.moduleId);

  // Gabungkan baseURL dengan endpoint
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${companyId}/${module_id}/get-categories`;

  console.log('URL from useCategories:', url); // Debugging log

  const { data, isLoading, error, ...rest } = useQuery<
    CategoriesResponse,
    Error
  >({
    queryKey: ['categories', company_id, page, limit],
    queryFn: async () => {
      try {
        const response = await api.get<CategoriesResponse>(url, {
          params: { page, limit },
        });

        // console.log('Response from useCategories:', response.data); // Debugging log
        return response.data; // Kembalikan data dari respons
      } catch (error) {
        throw new Error('Failed to fetch categories'); // Tangani error
      }
    },
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  return {
    data: data?.data,
    total: data?.totalRecords,
    isLoading,
    error,
    ...rest,
  };
};

export default useCategories;
