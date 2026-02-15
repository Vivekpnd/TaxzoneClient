"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  // WooCommerce status mapping
  const statusSteps = [
    { key: "pending", label: "Placed" },
    { key: "processing", label: "Packed" },
    { key: "shipped", label: "Shipped" }, // if using custom shipped status
    { key: "completed", label: "Delivered" },
  ];

  const handleTrack = async () => {
    if (!orderId || !email) {
      setError("Please enter order ID and email");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch("/api/woocommerce/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Order not found");
      } else {
        setOrder(data.order); // FULL order from WooCommerce
      }
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  // Dynamic status index from WooCommerce
  const currentStatusIndex = order
    ? statusSteps.findIndex((step) => step.key === order.status)
    : -1;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-[#4B4B4B] mb-6">
          Track Your Order
        </h2>

        {/* Input Section */}
        {!order && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F26522] outline-none"
              />
              <input
                type="email"
                placeholder="Billing Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F26522] outline-none"
              />
            </div>

            <button
              onClick={handleTrack}
              className="w-full bg-[#F26522] hover:bg-[#d3541c] text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Tracking..." : "Track Order"}
            </button>
          </>
        )}

        {error && (
          <p className="text-red-500 mt-4 font-medium">{error}</p>
        )}

        {/* ORDER DETAILS */}
        {order && (
          <div className="mt-8">

            {/* Order Info */}
            <div className="mb-8">
              <p className="text-gray-700">
                <span className="font-semibold">Order Code:</span> #{order.id}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Total:</span> {order.total} {order.currency}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-[#F26522] capitalize font-semibold">
                  {order.status}
                </span>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative flex justify-between items-center mb-10">

              {/* Background Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>

              {/* Active Line */}
              {currentStatusIndex >= 0 && (
                <div
                  className="absolute top-5 left-0 h-1 bg-[#F26522] transition-all duration-500"
                  style={{
                    width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                  }}
                />
              )}

              {statusSteps.map((step, index) => {
                const isActive = index <= currentStatusIndex;

                return (
                  <div
                    key={step.key}
                    className="relative z-10 flex flex-col items-center w-full"
                  >
                    <div
                      className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2",
                        isActive
                          ? "bg-[#F26522] border-[#F26522] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      )}
                    >
                      {isActive && <FaCheck size={14} />}
                    </div>

                    <span
                      className={clsx(
                        "mt-2 text-sm font-medium",
                        isActive ? "text-[#4B4B4B]" : "text-gray-400"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-[#4B4B4B]">
                    <th className="p-3">Product</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.line_items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">
                        {item.total} {order.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setOrder(null)}
              className="mt-6 text-[#F26522] font-semibold hover:underline"
            >
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
