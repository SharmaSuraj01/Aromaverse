import React, { createContext, useContext, useState } from 'react';

// Create Context
export const CartContext = createContext();

// Custom Hook
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].qty += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updatedItems = [...cartItems];
    updatedItems[index].qty = newQty;
    setCartItems(updatedItems);
  };

  const removeFromCart = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        showCartModal,
        setShowCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
