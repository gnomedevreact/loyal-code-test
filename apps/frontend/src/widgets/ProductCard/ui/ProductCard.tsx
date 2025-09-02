import { Product } from '@/shared/models/types/products.types';
import { ActionsProductModal } from '@/features/ActionsProductModal';
import { DeleteProductModal } from '@/features/DeleteProductModal';
import { ProductImageUpload } from '@/features/ProductImageUpload';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <div className="w-64 bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3">
      <ActionsProductModal product={product} />
      <DeleteProductModal product={product} />
      <ProductImageUpload productId={product.id} initialUrl={product.photo_url} />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">Art. {product.article}</p>
      </div>

      <div className="flex items-center gap-2">
        {product.discounted_price ? (
          <>
            <span className="text-lg font-bold text-green-600">
              {product.discounted_price} €
            </span>
            <span className="text-sm text-gray-400 line-through">{product.price} €</span>
          </>
        ) : (
          <span className="text-lg font-bold text-gray-800">{product.price} €</span>
        )}
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

      <Link
        href={`/product/${product.id}`}
        className={
          'flex items-center text-center text-base text-white bg-blue-400/50 rounded-lg'
        }
      >
        Перейти на страницу продукта
      </Link>

      <p className="text-xs text-gray-400 mt-auto">
        Added: {new Date(product.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};
