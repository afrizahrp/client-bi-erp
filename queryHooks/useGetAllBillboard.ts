import { api } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/auth.provider';
import { useModuleStore } from '@/store';

interface Billboard {
  id: string;
  section: number;
  content_id: string;
  title: string;
  name: string;
  isImage: boolean;
  contentURL: string;
  contentType: string;
  iStatus: string;
  iShowedStatus: string;
  remarks?: string;
}

interface BillboardResponse {
  data: Billboard[];
  totalRecords: number;
}

export const useGetAllBillboard = (page: number, limit: number) => {
  const { session } = useAuth();
  const company_id = session?.user?.company_id;
  const module_id = useModuleStore((state) => state.moduleId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${company_id}/${module_id}/billboards/all`;

  const { data, isLoading, error, isFetching, ...rest } = useQuery<
    BillboardResponse,
    Error
  >({
    queryKey: ['billboards', company_id, page, limit],
    queryFn: async () => {
      try {
        const response = await api.get<BillboardResponse>(url);

        console.log('Response data:', response.data); // Debugging log
        return response.data; // Kembalikan data dari respons
      } catch (error) {
        console.error('Error fetching billboard:', error); // Debugging log
        throw new Error('Failed to fetch billboard'); // Tangani error
      }
    },
    staleTime: 60 * 1000, // 60s
    retry: 3,
    keepPreviousData: true,
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

export default useGetAllBillboard;
