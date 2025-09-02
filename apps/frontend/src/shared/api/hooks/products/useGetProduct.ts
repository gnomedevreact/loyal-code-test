import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@/shared/api/services/products/products.service';

export const useGetProduct = (productId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => ProductsService.getProductById(productId),
    select: ({ data }) => data,
  });

  return { data, isLoading };
};
