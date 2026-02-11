"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order not found");
      }

      setOrder(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Track Your Order
        </h1>

        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Order ID
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g. 1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Billing Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Checking..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div className="mt-6 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-8 bg-gray-100 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold">
              Order #{order.id}
            </h2>

            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="font-medium capitalize">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span>₹ {order.total}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Date:</span>
              <span>
                {order.date_created
                  ? new Date(order.date_created).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
