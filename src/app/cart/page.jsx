"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your cart is empty 🛒
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Heading */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Your Cart
        </h1>
        <p className="text-gray-500 mt-2">
          Review your items before checkout.
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {items.map((item) => {
          const imageUrl =
            item.image?.startsWith("http")
              ? item.image
              : "https://via.placeholder.com/300";

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 border rounded-2xl p-5 bg-white hover:shadow-sm transition"
            >
              {/* IMAGE */}
              <div className="relative w-full sm:w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg leading-snug line-clamp-2">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="font-semibold text-lg">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-12 border-t pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold">
            Total: ₹{total.toFixed(2)}
          </div>

          <Link
            href="/checkout"
            className="w-full sm:w-auto text-center bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </Link>
        </div>

        <div className="mt-6 text-center sm:text-left">
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:underline"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
