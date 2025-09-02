import { Product } from '@/shared/models/types/products.types';
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
import { useDeleteProduct } from '@/shared/api/hooks/products/useDeleteProduct';
import { useState } from 'react';

interface DeleteProductModalProps {
  product: Product;
}

export function DeleteProductModal(props: DeleteProductModalProps) {
  const { product } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = async () => {
    await deleteProduct(product.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Удалить продукт</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            Вы уверены, что хотите удалить <b>{product.name}</b> (арт. {product.article})?
          </p>
          <p className="text-sm text-muted-foreground">Это действие нельзя отменить.</p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              Удалить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
