"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import SearchBar from "./SearchBar";

export default function MainHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const items = useCartStore((state) => state.items);

  const count = items.reduce((t, i) => t + i.qty, 0);
  const total = items.reduce((t, i) => t + i.qty * i.price, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Track Order", href: "/track-order" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="w-full bg-white shadow-md rounded-bl-[12px] rounded-br-[12px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-6 py-4">

            {/* LOGO */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://backend.taxzone.store/wp/wp-content/uploads/2026/02/cropped-WhatsApp-Image-2026-01-28-at-22.09.44-removebg-preview.png"
                alt="TaxZone"
                width={170}
                height={50}
                priority
                className="object-contain"
              />
            </Link>

            {/* SEARCH (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchBar />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">

              {!loggedIn && (
                <Link
                  href="/login"
                  className="hidden lg:flex flex-col text-sm"
                >
                  <span className="text-xs text-gray-500">HELLO</span>
                  <span className="font-semibold hover:text-orange-600 transition">
                    Sign In / Register
                  </span>
                </Link>
              )}

              {/* CART */}
              <Link
                href="/cart"
                className="flex items-center gap-2 relative group"
              >
                <div className="relative">
                  <ShoppingCart
                    size={26}
                    className={`transition ${
                      isActive("/cart")
                        ? "text-orange-600"
                        : "text-gray-700 group-hover:text-orange-600"
                    }`}
                  />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-sm leading-tight">
                  <span className="text-gray-500">Shopping Cart</span>
                  <span className="font-semibold text-gray-800">
                    Rs. {total.toFixed(2)}
                  </span>
                </div>
              </Link>

              {/* HAMBURGER (Desktop + Mobile) */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <Menu size={26} />
              </button>

            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="pb-4 md:hidden">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR (Desktop + Mobile Same) */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-4">

          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-orange-600 text-white"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="border-t pt-4 mt-4">
            {!loggedIn && (
              <Link
                href="/login"
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Sign In / Register
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  );
}