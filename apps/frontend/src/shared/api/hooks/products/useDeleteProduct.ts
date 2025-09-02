import { ProductsService } from '@/shared/api/services/products/products.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getError } from '@/shared/lib/getError';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete product'],
    mutationFn: (productId: number) => ProductsService.deleteProduct(productId),
    onSuccess() {
      toast.success('Продукт удален');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(err) {
      toast.error(getError(err));
    },
  });

  return { mutateAsync, isPending };
};
