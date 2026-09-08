import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// EXERCISE 1 — React Context + custom useCart hook
// This is kept as the Context version you can study before moving to Zustand.
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((current) => [...current, product]);
  }

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
