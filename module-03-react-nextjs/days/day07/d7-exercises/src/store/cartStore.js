import { create } from "zustand";
import { persist } from "zustand/middleware";

// EXERCISE 4 — Move cart state from Context into a Zustand store.
// EXERCISE 5 — Components use narrow selectors instead of subscribing to the whole store.
// EXERCISE 6 — persist keeps the cart in localStorage after a page refresh.
const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-state-practice",
    }
  )
);

export default useCartStore;
