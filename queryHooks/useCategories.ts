import { api } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/auth.provider';
import { useModuleStore } from '@/store';

interface Category {
  id: string;
  name: string;
  categoryType: string;
  slug: string | null;
  iStatus: string;
  imageURL: string;
  remarks?: string;
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

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${companyId}/${module_id}/get-categories`;

  const { data, isLoading, error, isFetching, ...rest } = useQuery<
    CategoriesResponse,
    Error
  >({
    queryKey: ['categories', company_id, page, limit],
    queryFn: async () => {
      try {
        const response = await api.get<CategoriesResponse>(url, {
          params: { page, limit },
        });

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
    isFetching, // Tambahkan untuk menampilkan loading hanya saat fetch baru

    error,
    ...rest,
  };
};

export default useCategories;
