import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@/shared/api/services/products/products.service';
import { GetProductsQuery } from '@/shared/models/types/products.types';

export const useGetProducts = (queries: GetProductsQuery) => {
  const { data, isLoading } = useQuery({
    queryKey: ['products', queries],
    queryFn: () => ProductsService.getAllProducts(queries),
    select: ({ data }) => data,
  });

  return { data, isLoading };
};
