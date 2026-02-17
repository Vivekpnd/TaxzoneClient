import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? { ...i, qty: i.qty + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1,
              },
            ],
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      clearCart: () => set({ items: [] }),

      // ✅ FIX: count is now a NUMBER, not a function
      count: 0,
    }),
    {
      name: "taxzone-cart",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.count = state.items.reduce(
            (sum, item) => sum + item.qty,
            0
          );
        }
      },
    }
  )
);
