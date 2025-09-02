import { axiosClassic } from '@/core/configs/axios.config';
import {
  GetProductsQuery,
  Product,
  ProductMutate,
  ProductsResponse,
} from '@/shared/models/types/products.types';

export const ProductsService = {
  async getAllProducts({ q, page = 1, limit = 10, sort = 'ASC' }: GetProductsQuery) {
    return await axiosClassic.get<ProductsResponse>('/products', {
      params: {
        q,
        page,
        limit,
        sort,
      },
    });
  },

  async addProduct(product: ProductMutate) {
    return await axiosClassic.post<Product>('/products', product);
  },

  async updateProduct({
    product,
    updatedProduct,
  }: {
    product: Product;
    updatedProduct: ProductMutate;
  }) {
    return await axiosClassic.put<Product>(`/products/${product.id}`, updatedProduct);
  },

  async deleteProduct(productId: number) {
    return await axiosClassic.delete(`/products/${productId}`);
  },

  async getProductById(productId: number) {
    return await axiosClassic.get<Product>(`/products/${productId}`);
  },
};
