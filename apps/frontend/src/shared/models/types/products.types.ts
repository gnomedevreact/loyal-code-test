export type Product = {
  id: number;
  article: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  photo_url?: string;
  created_at: Date;
};

export type GetProductsQuery = {
  q?: string;
  page?: number;
  limit?: number;
  sort: 'ASC' | 'DESC';
};

export type ProductsResponse = {
  items: Product[];
  limit: string;
  page: string;
  pages: number;
  total: number;
};

export type ProductMutate = Omit<Product, 'id' | 'created_at'>;
