import { ProductsService } from '@/shared/api/services/products/products.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductMutate } from '@/shared/models/types/products.types';
import { toast } from 'sonner';
import { getError } from '@/shared/lib/getError';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['add product'],
    mutationFn: (product: ProductMutate) => ProductsService.addProduct(product),
    onSuccess() {
      toast.success('Продукт добавлен');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(err) {
      toast.error(getError(err));
    },
  });

  return { mutateAsync, isPending };
};
