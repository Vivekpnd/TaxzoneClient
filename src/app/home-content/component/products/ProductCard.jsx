"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../cart/page";
import { useState } from "react";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [loading, setLoading] = useState(false);

  const image =
    product.images?.[0]?.src ||
    "https://via.placeholder.com/500";

  function handleAdd() {
    setLoading(true);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
    });

    setTimeout(() => setLoading(false), 400);
  }

  return (
    <div className="bg-white rounded-xl border hover:shadow-lg transition flex flex-col">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative w-full h-56 bg-gray-100 rounded-t-xl overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm line-clamp-2">
          {product.name}
        </h3>

        {product.price_html && (
          <div
            className="text-green-600 font-bold mt-2"
            dangerouslySetInnerHTML={{
              __html: product.price_html,
            }}
          />
        )}

        <button
          onClick={handleAdd}
          disabled={loading}
          className={`mt-auto py-2 rounded-lg text-white font-medium ${
            loading
              ? "bg-gray-400"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
