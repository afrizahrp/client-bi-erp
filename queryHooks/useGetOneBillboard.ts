import { api } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/provider/auth.provider';
import { useModuleStore } from '@/store';
import { Billboard } from '@/types';

// interface Billboard {
//   id: number;
//   section: number;
//   content_id: string;
//   title: string;
//   name: string;
//   isImage: boolean;
//   contentURL: string;
//   contentType: string;
//   iStatus: string;
//   iShowedStatus: string;
//   remarks?: string;
// }

// interface BillboardResponse {
//   data: Billboard[];
// }

export const useGetOneBillboard = (id: string) => {
  const { session } = useAuth();
  const company_id = session?.user?.company_id;
  const module_id = useModuleStore((state) => state.moduleId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${company_id}/${module_id}/billboards/${id}}`;

  const { data, isLoading, error, isFetching, ...rest } = useQuery<
    Billboard,
    Error
  >({
    queryKey: ['billboard', company_id, id],
    queryFn: async () => {
      try {
        const response = await api.get<Billboard>(url);

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
    data,
    isLoading,
    isFetching, // Tambahkan untuk menampilkan loading hanya saat fetch baru
    error,
    ...rest,
  };
};

export default useGetOneBillboard;
