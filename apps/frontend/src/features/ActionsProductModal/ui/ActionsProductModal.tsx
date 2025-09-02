import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/primitives/dialog';
import { Button } from '@/shared/primitives/button';
import { Label } from '@/shared/primitives/label';
import { Input } from '@/shared/primitives/input';
import { useForm } from 'react-hook-form';
import { Product, ProductMutate } from '@/shared/models/types/products.types';
import { useCreateProduct } from '@/shared/api/hooks/products/useCreateProduct';
import { useState } from 'react';
import { useUpdateProduct } from '@/shared/api/hooks/products/useUpdateProduct';

type FormProps = ProductMutate;

interface ActionsProductModal {
  product?: Product;
}

export const ActionsProductModal = (props: ActionsProductModal) => {
  const { product } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: product?.name || 'Чай',
      article: product?.article || 'SK-838',
      description: product?.description || 'Вкусный чай',
      price: product?.price || 100,
      discounted_price: product?.discounted_price || 90,
    },
  });
  const { mutateAsync: createProduct, isPending: isPendingCreate } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isPendingUpdate } = useUpdateProduct();

  const submit = async (data: FormProps) => {
    product
      ? await updateProduct({ product, updatedProduct: data })
      : await createProduct(data);
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {product ? 'Обновить продукт' : 'Добавить продукт'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Добавить продукт</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name-1">Название</Label>
              <Input
                id="name-1"
                {...register('name', { required: 'Введите название продукта' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="article-1">Артикул</Label>
              <Input
                id="article-1"
                {...register('article', { required: 'Введите артикул' })}
              />
              {errors.article && (
                <p className="text-red-500 text-sm">{errors.article.message}</p>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="desc-1">Описание</Label>
              <Input
                id="desc-1"
                {...register('description', {
                  required: 'Введите описание',
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="flex items-start gap-4">
              <div className="grid gap-1">
                <Label htmlFor="price-1">Цена</Label>
                <Input
                  id="price-1"
                  type="number"
                  {...register('price', {
                    required: 'Введите цену',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Цена должна быть больше 0' },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="grid gap-1">
                <Label htmlFor="disc-price-1">Цена со скидкой</Label>
                <Input
                  id="disc-price-1"
                  type="number"
                  {...register('discounted_price', {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: 'Цена со скидкой не может быть отрицательной',
                    },
                  })}
                />
                {errors.discounted_price && (
                  <p className="text-red-500 text-sm">
                    {errors.discounted_price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                disabled={isPendingCreate || isPendingUpdate}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPendingCreate || isPendingUpdate}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
