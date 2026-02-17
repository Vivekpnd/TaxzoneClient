"use client";

import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "../lib/auth";
import { FiShoppingCart, FiMapPin, FiCreditCard } from "react-icons/fi";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const loggedUser = getUser();
    const storedToken = getToken();

    if (!loggedUser || !storedToken) {
      router.push("/login");
      return;
    }

    setCustomer((prev) => ({
      ...prev,
      first_name: loggedUser.name?.split(" ")[0] || "",
      last_name: loggedUser.name?.split(" ")[1] || "",
      email: loggedUser.email || "",
    }));
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
      </div>
    );
  }

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  function handleNext() {
    for (let key in customer) {
      if (!customer[key]) {
        alert("Please fill all required fields");
        return;
      }
    }

    localStorage.setItem("checkout_customer", JSON.stringify(customer));
    router.push("/payment");
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">

      {/* PROFESSIONAL STEPPER */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="flex items-center justify-between relative">

          {/* Line Background */}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>

          {/* Active Progress Line */}
          <div className="absolute top-5 left-0 w-1/2 h-[2px] bg-black transition-all duration-500"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow">
              <FiShoppingCart size={18} />
            </div>
            <span className="text-xs mt-2 font-medium">Cart</span>
          </div>

          {/* Step 2 (Active) */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg scale-110 transition">
              <FiMapPin size={20} />
            </div>
            <span className="text-xs mt-2 font-semibold">
              Address
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center w-1/3">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
              <FiCreditCard size={18} />
            </div>
            <span className="text-xs mt-2 text-gray-400">
              Payment
            </span>
          </div>

        </div>
      </div>

      {/* FORM CARD */}
      <div className="max-w-4xl mx-auto bg-white border rounded-2xl p-10 shadow-sm animate-fadeIn">

        <h2 className="text-2xl font-semibold mb-10 text-center">
          Shipping Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {Object.keys(customer).map((key) => (
            <div key={key} className="relative">
              <input
                name={key}
                value={customer[key]}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />
              <label
                className="absolute left-4 top-2 text-xs text-gray-500
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                transition-all duration-200"
              >
                {key.replace("_", " ").toUpperCase()}
              </label>
            </div>
          ))}

        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleNext}
            className="bg-black text-white px-14 py-4 rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-md"
          >
            Continue to Payment
          </button>
        </div>

      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
