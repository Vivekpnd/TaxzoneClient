"use client";

import { useEffect, useState } from "react";
import { logout, getUser } from "../lib/auth";
import Link from "next/link";
import { Package, User, LogOut } from "lucide-react";

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

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `/api/woocommerce/orders?customer=${loggedUser.id}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load orders.");
          return;
        }

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setError("Invalid server response.");
        }
      } catch (err) {
        setError("Something went wrong while fetching orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading account...
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and track your recent orders.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <nav className="flex flex-col space-y-4 text-sm">
              <Link
                href="/account"
                className="text-gray-600 hover:text-black"
              >
                Dashboard
              </Link>

              <Link
                href="/account/orders"
                className="text-gray-600 hover:text-black"
              >
                Orders
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:underline"
              >
                <LogOut size={16} /> Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* Orders Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Orders
              </h2>

              {loadingOrders ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-gray-100 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Package size={36} className="mx-auto mb-3 opacity-40" />
                  No orders found.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date_created).toLocaleDateString()}
                        </p>
                        <p className="mt-1 font-semibold text-lg text-gray-800">
                          ₹{order.total}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                        <Link
                          href={`/track-order`}
                          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
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
    </div>
  );
}
