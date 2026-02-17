"use client";

import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "../lib/auth";
import {
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaShoppingCart,
  FaAddressCard,
  FaWallet,
} from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

export default function PaymentPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Load checkout data
  useEffect(() => {
    const saved = localStorage.getItem("checkout_customer");

    if (!saved) {
      router.push("/checkout");
      return;
    }

    setCustomer(JSON.parse(saved));
  }, [router]);

  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ✅ If cart empty
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">No items found</h1>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.qty || item.quantity),
    0
  );

  // ✅ PLACE RAZORPAY ORDER
  async function handleRazorpay() {
    if (!customer) return alert("Customer info missing");
    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const { order, error } = await res.json();
      if (error) throw new Error(error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Store Name",
        description: "Purchase Order",
        order_id: order.id,
        prefill: {
          name: `${customer.first_name} ${customer.last_name}`,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#000000" },
        handler: async function (response) {
          try {
            const wcRes = await fetch("/api/woocommerce/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: getToken(),
                customer_id: getUser().id,
                cartItems: items.map((item) => ({
                  id: item.id,
                  quantity: item.qty || item.quantity,
                })),
                billing: {
                  first_name: customer.first_name,
                  last_name: customer.last_name,
                  email: customer.email,
                  phone: customer.phone,
                  address_1: customer.address,
                  city: customer.city,
                  state: customer.state,
                  postcode: customer.pincode,
                  country: "IN",
                },
                payment_method: "razorpay",
                payment_method_title: "Razorpay",
                set_paid: true,
                razorpay_payment_id: response.razorpay_payment_id,
              }),
            });

            const data = await wcRes.json();
            if (!wcRes.ok)
              throw new Error(data.message || "Order creation failed");

            clearCart();
            router.push("/account");
          } catch (err) {
            alert(err.message || "Order failed after payment");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* PROGRESS BAR */}
        <div className="mb-14">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-gray-400 -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-gray-200 text-black flex items-center justify-center">
                <FaShoppingCart />
              </div>
              <span className="text-xs mt-2 text-gray-600">Cart</span>
            </div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-gray-200 text-black flex items-center justify-center">
                <FaAddressCard />
              </div>
              <span className="text-xs mt-2 text-gray-600">Checkout</span>
            </div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center ring-4 ring-gray-100">
                <FaWallet />
              </div>
              <span className="text-xs mt-2 font-semibold text-black">
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-bold text-black">
              Secure Payment
            </h1>

            <div className="bg-gray-50 rounded-2xl shadow-sm border overflow-hidden">
              <div className="flex items-center justify-between p-6 bg-white">
                <div className="flex items-center gap-4">
                  <SiRazorpay className="text-black" />
                  <div>
                    <h3 className="font-semibold text-black">Razorpay</h3>
                    <p className="text-sm text-gray-500">
                      UPI, Card, Net Banking
                    </p>
                  </div>
                </div>
                <FaCheckCircle className="text-green-500" />
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <FaLock /> 256-bit SSL secured
              <FaShieldAlt />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border h-fit">
            <h2 className="text-xl font-bold mb-6 text-black">
              Order Summary
            </h2>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-3 text-sm">
                <span>
                  {item.name} × {item.qty || item.quantity}
                </span>
                <span>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.qty || item.quantity)
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleRazorpay}
              disabled={loading}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Pay Securely"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
