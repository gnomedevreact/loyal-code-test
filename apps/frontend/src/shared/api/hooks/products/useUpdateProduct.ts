import { ProductsService } from '@/shared/api/services/products/products.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Product, ProductMutate } from '@/shared/models/types/products.types';
import { getError } from '@/shared/lib/getError';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update product'],
    mutationFn: (updateData: { product: Product; updatedProduct: ProductMutate }) =>
      ProductsService.updateProduct(updateData),
    onSuccess() {
      toast.success('Продукт обновлен');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(err) {
      toast.error(getError(err));
    },
  });

  return { mutateAsync, isPending };
};
