import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductDto } from '../types/Product';
import type { CartItemLite, CartItemFull } from '../types/CartItem';
import { useAuth } from './AuthContext';
import api from '../api/axios';

interface CartContextType {
  items: CartItemFull[];
  refreshCart: () => void;
  addToCart: (product: ProductDto) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItemFull[]>([]);

  const refreshCart = async () => {
    if (!user) return;

    const rawItems = await api.get(`/cart/${user.id}`).then(res => res.data as CartItemLite[]);

    const enrichedItems: CartItemFull[] = await Promise.all(
      rawItems.map(async (item) => {
        const product = await api.get(`/products/${item.productId}`).then(res => res.data as ProductDto);
        return {
          id: item.id,
          quantity: item.quantity,
          product,
        };
      })
    );

    setItems(enrichedItems);
  };

  useEffect(() => {
    if (user) refreshCart();
  }, [user]);

  const addToCart = async (product: ProductDto) => {
    if (!user) return;
    await api.post('/cart', {
      productId: product.id,
      userId: user.id,
      quantity: 1,
    });
    await refreshCart();
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    await api.put(`/cart/${cartItemId}`, { quantity });
    await refreshCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    await api.delete(`/cart/${cartItemId}`);
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
