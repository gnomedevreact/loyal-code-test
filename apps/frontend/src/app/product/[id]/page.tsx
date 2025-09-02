import React from 'react';
import { Product } from '@/screens/Product/ui/Product';

const ProductPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return <Product id={id} />;
};

export default ProductPage;
