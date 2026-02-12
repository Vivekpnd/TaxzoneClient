'use client';

import { useEffect, useState } from "react";
import { logout, getUser } from "../lib/auth";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedUser = getUser();
    setUser(loggedUser);

    if (!loggedUser?.id) {
      setLoadingOrders(false);
      return;
    }

    fetch(`/api/woocom/orders?customer=${loggedUser.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setError("Failed to load orders.");
        }
      })
      .catch(() => setError("Something went wrong while fetching orders."))
      .finally(() => setLoadingOrders(false));

  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading account...</p>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Sidebar */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Account Menu</h2>
          <div className="flex flex-col space-y-3">
            <Link href="/account" className="hover:text-black text-gray-600">Dashboard</Link>
            <Link href="/account/orders" className="hover:text-black text-gray-600">Orders</Link>
            <Link href="/account/edit" className="hover:text-black text-gray-600">Edit Profile</Link>
            <button
              onClick={logout}
              className="text-left text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">

          {/* Profile Section */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">My Orders</h2>

            {loadingOrders ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No orders found.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.date_created).toLocaleDateString()}
                      </p>
                      <p className="mt-1 font-semibold">
                        ₹{order.total}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>

                      <Link
                        href={`/order/${order.id}`}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
                      >
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
