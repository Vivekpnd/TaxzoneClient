"use client";

import { useCartStore } from "@/store/cartStore";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  if (!items.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 sticky top-6">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>
        <p className="text-sm text-gray-500">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-6">
      <h2 className="text-lg font-semibold mb-4">
        Order Summary
      </h2>

      <div className="space-y-3">
        {items.map((item) => {
          const lineTotal = Number(item.price) * item.qty;

          return (
            <div
              key={item.id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{lineTotal}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}
