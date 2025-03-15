import { api } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/auth.provider';
import { useModuleStore } from '@/store';

interface Billboard {
  id: number;
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
}

export const useBillboard = () => {
  const { session } = useAuth();
  const companyId = session?.user?.company_id;
  const module_id = useModuleStore((state) => state.moduleId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${companyId}/${module_id}/billboards/all`;

  const { data, isLoading, error, isFetching, ...rest } = useQuery<
    BillboardResponse,
    Error
  >({
    queryKey: ['billboards'],
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
    isLoading,
    isFetching, // Tambahkan untuk menampilkan loading hanya saat fetch baru
    error,
    ...rest,
  };
};

export default useBillboard;
