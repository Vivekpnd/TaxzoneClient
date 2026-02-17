"use client";

import { useState } from "react";
import { useCartStore } from "../../../store/cartStore";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [loading, setLoading] = useState(false);

  function handleAdd() {
    setLoading(true);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src,
    });

    setTimeout(() => setLoading(false), 400);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`w-full py-2 rounded-lg text-white font-medium ${
        loading
          ? "bg-gray-400"
          : "bg-black hover:bg-gray-800"
      }`}
    >
      {loading ? "Adding…" : "Add to Cart"}
    </button>
  );
}
