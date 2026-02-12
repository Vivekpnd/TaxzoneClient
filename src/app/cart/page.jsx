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
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h1>
        <Link href="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  return (
    <div className="container mx-auto py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {items.map((item) => {
          const imageUrl =
            item.image?.startsWith("http")
              ? item.image
              : "https://via.placeholder.com/300";

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-lg p-4"
            >
              {/* IMAGE */}
              <div className="relative w-[90px] h-[90px] bg-gray-100 rounded">
                <Image
                  src={imageUrl}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover rounded"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm">
                  ₹{item.price} × {item.qty}
                </p>
                <p className="font-semibold mt-1">
                  Subtotal: ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>

              {/* ACTION */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6">
        <p className="text-xl font-bold">
          Total: ₹{total.toFixed(2)}
        </p>

        <Link
          href="/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>
      </div>

      <button
        onClick={clearCart}
        className="mt-6 text-sm text-gray-500 underline"
      >
        Clear cart
      </button>
    </div>
  );
}
