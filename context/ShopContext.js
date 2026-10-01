'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, PRODUCTS } from '@/data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  // Initialize with 1 default item so the user immediately sees a populated luxury bag if opened
  useEffect(() => {
    setCart([
      {
        product: PRODUCTS[0],
        size: '40 / M',
        quantity: 1,
      },
    ]);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const addToCart = (product, size = '40 / M', quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`Added "${product.name}" (${size}) to your Bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, size, change) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
    showToast('Item removed from your Bag');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Saved Curations');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Saved Curations');
        return [...prev, productId];
      }
    });
  };

  const formatPrice = (usdAmount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(usdAmount * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const cartTotalUSD = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        toast,
        showToast,
        formatPrice,
        cartTotalUSD,
        cartItemCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
