"use client";

import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "../lib/auth";
import {
  FaMoneyBillWave,
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

  const [paymentMethod, setPaymentMethod] = useState("cod");
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

  // ✅ PLACE COD ORDER
async function placeCODOrder() {
  setLoading(true);

  const user = getUser();
  const token = getToken();

  if (!user || !token) {
    alert("Please login first");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("/api/woocommerce/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        customer_id: user.id, // ✅ CORRECT FIX

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

        payment_method: "cod",
        payment_method_title: "Cash on Delivery",
        set_paid: false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order failed");
      setLoading(false);
      return;
    }

    clearCart();
    router.push("/Account");

  } catch (err) {
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
}


  function handleRazorpay() {
    alert("Razorpay integration coming soon.");
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* PROGRESS BAR */}
        <div className="mb-14">
          <div className="relative flex items-center justify-between">

            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-black -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                <FaShoppingCart />
              </div>
              <span className="text-xs mt-2 text-gray-600">Cart</span>
            </div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                <FaAddressCard />
              </div>
              <span className="text-xs mt-2 text-gray-600">Checkout</span>
            </div>

            <div className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center ring-4 ring-gray-200">
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

            <h1 className="text-3xl font-bold">
              Secure Payment
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

              {/* COD */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center justify-between p-6 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <FaMoneyBillWave />
                  <div>
                    <h3 className="font-semibold">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm opacity-70">
                      Pay when delivered
                    </p>
                  </div>
                </div>
                {paymentMethod === "cod" && <FaCheckCircle />}
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center justify-between p-6 cursor-pointer border-t transition ${
                  paymentMethod === "razorpay"
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <SiRazorpay />
                  <div>
                    <h3 className="font-semibold">
                      Razorpay
                    </h3>
                    <p className="text-sm opacity-70">
                      UPI, Card, Net Banking
                    </p>
                  </div>
                </div>
                {paymentMethod === "razorpay" && <FaCheckCircle />}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <FaLock /> 256-bit SSL secured
              <FaShieldAlt />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border h-fit">
            <h2 className="text-xl font-bold mb-6">
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
              onClick={
                paymentMethod === "cod"
                  ? placeCODOrder
                  : handleRazorpay
              }
              disabled={loading}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "cod"
                ? "Place Order"
                : "Pay Securely"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
