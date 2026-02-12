"use client";

import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "../lib/auth";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

  // ✅ Load logged-in user safely
  useEffect(() => {
    const loggedUser = getUser();
    const storedToken = getToken();
    if (!loggedUser || !storedToken) {
      router.push("/login");
      return;
    }

    setUser(loggedUser);
    setToken(storedToken);

    // Prefill customer info if available
    setCustomer((prev) => ({
      ...prev,
      first_name: loggedUser.name?.split(" ")[0] || "",
      last_name: loggedUser.name?.split(" ")[1] || "",
      email: loggedUser.email || "",
    }));
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty 🛒</h1>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.qty || item.quantity),
    0
  );

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  async function placeOrder() {
    // 🔒 Strict login check
    if (!user || !token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    // 🧾 Validate all fields
    for (let key in customer) {
      if (!customer[key]) {
        alert("Please fill all required fields");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/woocommerce/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token, // pass token from state
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        setLoading(false);
        return;
      }

      // ✅ Success: clear cart & redirect
      clearCart();
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Delivery Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(customer).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.replace("_", " ").toUpperCase()}
              value={customer[key]}
              onChange={handleChange}
              className="input"
            />
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 h-fit">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        {items.map((item) => (
          <div key={item.id} className="flex gap-3 mb-4">
            <Image
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.name}
              width={70}
              height={70}
            />
            <div className="flex-1">
              <p>{item.name}</p>
              <p>Qty: {item.qty || item.quantity}</p>
            </div>
            <p>
              ₹
              {(
                Number(item.price) *
                Number(item.qty || item.quantity)
              ).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
