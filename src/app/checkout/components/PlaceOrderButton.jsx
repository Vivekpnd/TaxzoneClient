"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function PlaceOrderButton({ customer }) {
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function placeOrder() {
    if (!items.length) {
      alert("Cart is empty");
      return;
    }

    // 🚨 MUST be WooCommerce WordPress user ID
    if (!customer || !customer.id) {
      alert("User not logged in properly");
      return;
    }

    setLoading(true);

    try {
      console.log("Placing order for Woo user ID:", customer.id);

      const response = await fetch("/api/woocommerce/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: parseInt(customer.id), // ensure number
          items: items.map((item) => ({
            id: Number(item.id),
            qty: Number(item.qty),
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      clearCart();

      router.push(`/order-success?order=${data.id}`);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={placeOrder}
      disabled={loading}
      className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
    >
      {loading ? "Placing order…" : "Place Order"}
    </button>
  );
}
