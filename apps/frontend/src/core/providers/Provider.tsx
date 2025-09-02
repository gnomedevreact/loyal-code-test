'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@/shared/ui/Container';

interface ProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Provider = (props: ProviderProps) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <Container>{children}</Container>
    </QueryClientProvider>
  );
};
