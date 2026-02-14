"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import SearchBar from "./SearchBar";

export default function MainHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const items = useCartStore((state) => state.items);
  const count = items.reduce((t, i) => t + i.qty, 0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Accessories", href: "/accessories" },
    { name: "Track Order", href: "/track-order" },
    { name: "Contact Us", href: "/ContactUs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* MAIN ROW */}
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/">
            <Image
              src="https://backend.taxzone.store/wp/wp-content/uploads/2026/02/cropped-WhatsApp-Image-2026-01-28-at-22.09.44-removebg-preview.png"
              alt="TaxZone"
              width={170}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 hover:text-orange-600 transition group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">

            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* LOGIN BUTTON (ONLY IF NOT LOGGED IN) */}
            {!loggedIn && (
              <Link
                href="/login"
                className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative group"
            >
              <ShoppingCart
                size={24}
                className="text-gray-700 group-hover:text-orange-600 transition"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Login (Only If Not Logged In) */}
            {!loggedIn && (
              <Link
                href="/login"
                className="lg:hidden text-sm font-medium text-orange-600"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-lg z-50 transform transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 font-medium hover:text-orange-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

    </header>
  );
}
