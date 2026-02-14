"use client";

import Link from "next/link";
import { X } from "lucide-react";

const menu = [
  { label: "Home", href: "/" },
  { label: "Accessories", href: "/shop?cat=accessories" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar({ open, onClose }) {
  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden md:block bg-gradient-to-r relative z-[99999] ">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-8 py-3 text-black font-medium">
            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative hover:text-white after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="absolute left-0 top-0 h-full w-[260px] bg-white p-6 animate-slide-in shadow-xl">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold text-lg">Menu</h3>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <ul className="space-y-4">
              {menu.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block font-medium text-gray-800 hover:text-red-600 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
