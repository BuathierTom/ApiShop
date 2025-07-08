import type { ProductDto } from './Product';

export interface CartItemLite {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
}

export interface CartItemFull {
  id: string;
  quantity: number;
  product: ProductDto;
}