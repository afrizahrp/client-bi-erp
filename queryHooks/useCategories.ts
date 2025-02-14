import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/config/axios.config';

export const useCategories = () => {
  const { data, isLoading, error, ...rest } = useQuery<any[], Error>({
    queryKey: ['categories'],
    queryFn: () =>
      api.get('/categories', {}).then((res) =>
        res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          categoryType: item.categoryType?.name,
          iStatus: item.iStatus,
          status: item.status?.name,
          remarks: item?.remarks,
          // images: item.images.map((image: any) => image.imageURL),
        }))
      ),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  return { data, isLoading, error, ...rest };
};

export default useCategories;
