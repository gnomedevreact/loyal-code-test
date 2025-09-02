'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePushParams } from '@/widgets/CatalogList/lib/usePushParams';
import { useGetProducts } from '@/shared/api/hooks/products/useGetProducts';
import { ProductCard } from '@/widgets/ProductCard';
import { ActionsProductModal } from '../../../features/ActionsProductModal';

type SortType = 'ASC' | 'DESC';

export const CatalogList = () => {
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(Number(searchParams.get('page') ?? 1) || 1);
  const [limit, setLimit] = useState<number>(Number(searchParams.get('limit') ?? 3) || 3);
  const [sort, setSort] = useState<SortType>(
    (searchParams.get('sort') as SortType) ?? 'DESC',
  );
  const [q, setQ] = useState<string>(searchParams.get('q') ?? '');

  const { pushParams } = usePushParams({ page, limit, q, sort });

  const { data: products, isLoading } = useGetProducts({ page, limit, q, sort });

  return (
    <section className="space-y-4 py-4">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
            pushParams({ q: e.target.value, page: 1 });
          }}
          placeholder="Поиск…"
          className="border px-3 py-2 w-64"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as SortType);
            setPage(1);
            pushParams({ sort: e.target.value, page: 1 });
          }}
          className="border px-3 py-2"
        >
          <option value="DESC">Сначала новые</option>
          <option value="ASC">Сначала старые</option>
        </select>

        <select
          value={limit}
          onChange={(e) => {
            const v = Number(e.target.value) || 10;
            setLimit(v);
            setPage(1);
            pushParams({ limit: v, page: 1 });
          }}
          className="border px-3 py-2"
        >
          {[3, 6, 9].map((n) => (
            <option key={n} value={n}>
              По {n} на страницы
            </option>
          ))}
        </select>

        <ActionsProductModal />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          {products?.items.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          className="px-3 py-2 border disabled:opacity-50"
          onClick={() => {
            const next = Math.max(1, page - 1);
            setPage(next);
            pushParams({ page: next });
          }}
          disabled={page <= 1}
        >
          {'<- Пред'}
        </button>

        <span className="px-2">
          Страница {page} / {products?.pages}
        </span>

        <button
          className="px-3 py-2 border disabled:opacity-50"
          onClick={() => {
            const next = page + 1;
            setPage(next);
            pushParams({ page: next });
          }}
          disabled={products?.pages ? page >= products.pages : false}
        >
          {'След ->'}
        </button>
      </div>
    </section>
  );
};
