import { usePathname, useRouter } from 'next/navigation';

export const usePushParams = (curr: {
  page: number;
  limit: number;
  sort: string;
  q: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const pushParams = (
    patch?: Partial<{ page: number; limit: number; sort: string; q: string }>,
  ) => {
    const next = {
      ...curr,
      ...patch,
    };

    const sp = new URLSearchParams();
    if (next.page && next.page > 1) sp.set('page', String(next.page));
    if (next.limit && next.limit !== 10) sp.set('limit', String(next.limit));
    if (next.sort && next.sort !== 'DESC') sp.set('sort', next.sort);
    if (next.q && next.q.trim() !== '') sp.set('q', next.q.trim());

    const url = sp.toString() ? `${pathname}?${sp.toString()}` : pathname;
    router.push(url);
  };

  return { pushParams };
};
