import api from './axios';
import type { CartItemFull } from '../types/CartItem';
import type { OrderDto } from '../types/Order';

export const createOrder = async (userId: string, items: CartItemFull[]) => {
  const orderItems = items.map((item) => ({
    id: crypto.randomUUID(),
    orderId: crypto.randomUUID(), // placeholder, backend peut l'ignorer
    productId: item.product.id,
    quantity: item.quantity,
    unitPrice: item.product.price,
  }));

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const payload = {
    userId,
    totalPrice,
    items: orderItems,
  };

  const res = await api.post('/orders', payload);
  return res.data;
};

export const getOrdersByUserId = async (userId: string): Promise<OrderDto[]> => {
  const res = await api.get(`/orders/user/${userId}`);
  return res.data;
};
