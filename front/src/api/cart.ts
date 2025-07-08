import api from './axios';
import type { ProductDto } from '../types/Product';
import type { CartItemLite } from '../types/CartItem';

export const getCartByUserId = async (userId: string): Promise<CartItemLite[]> => {
  const res = await api.get(`/cart/${userId}`);
  return res.data;
};

export const addToCart = async (product: ProductDto, userId: string): Promise<void> => {
  await api.post('/cart', {
    productId: product.id,
    userId,
    quantity: 1,
  });
};

export const updateCartItem = async (cartItemId: string, quantity: number): Promise<void> => {
  await api.put(`/cart/${cartItemId}`, { quantity });
};

export const removeCartItem = async (cartItemId: string): Promise<void> => {
  await api.delete(`/cart/${cartItemId}`);
};
