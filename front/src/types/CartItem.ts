import type { ProductDto } from './Product';

export interface CartItemDto {
  id: string;
  product: ProductDto;
  quantity: number;
  userId: string;
}
