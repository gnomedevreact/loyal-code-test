'use client';

import { useGetProduct } from '@/shared/api/hooks/products/useGetProduct';
import Link from 'next/link';

interface ProductProps {
  id: number;
}

function formatPrice(v: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR' }).format(v);
}

export const Product = (props: ProductProps) => {
  const { id } = props;

  const { data: product, isLoading } = useGetProduct(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-6">
        {product?.photo_url ? (
          <img
            src={product?.photo_url}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">Нет изображения</span>
        )}
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">{product?.name}</h1>
        <p className="text-sm text-gray-500">Артикул: {product?.article}</p>
      </div>

      <section className="mb-4">
        {product?.discounted_price ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product?.discounted_price)}
            </span>
            <span className="text-base text-gray-400 line-through">
              {formatPrice(product?.price)}
            </span>
          </div>
        ) : (
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(product?.price!)}
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Описание</h2>
        <p className="text-gray-800">{product?.description}</p>
      </section>

      <Link href={'/'} className={'text-blue-600'}>
        {'<- Вернуться назад'}
      </Link>
    </section>
  );
};
