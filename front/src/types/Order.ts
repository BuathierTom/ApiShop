export interface OrderItemDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: string;
  userId: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItemDto[];
}
