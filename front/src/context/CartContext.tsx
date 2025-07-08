import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItemDto } from '../types/CartItem';
import type { ProductDto } from '../types/Product';
import * as cartApi from '../api/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItemDto[];
  refreshCart: () => void;
  addToCart: (product: ProductDto) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItemDto[]>([]);

  const refreshCart = async () => {
    if (!user) return;
    const data = await cartApi.getCartByUserId(user.id);
    setItems(data);
  };

  useEffect(() => {
    if (user) refreshCart();
  }, [user]);

  const addToCart = async (product: ProductDto) => {
    if (!user) return;
    await cartApi.addToCart(product, user.id);
    await refreshCart();
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    await cartApi.updateCartItem(cartItemId, quantity);
    await refreshCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    await cartApi.removeCartItem(cartItemId);
    await refreshCart();
  };

  return (
    <CartContext.Provider value={{ items, refreshCart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
