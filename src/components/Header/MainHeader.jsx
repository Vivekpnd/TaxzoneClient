"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import SearchBar from "./SearchBar";
import { Menu } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export default function MainHeader({ onMenuClick }) {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((t, i) => t + i.qty, 0);

  return (
    // ✅ ONLY CHANGE IS HERE
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur  shadow-sm">

      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex items-center gap-4">

          {/* LOGO */}
          <div className="flex items-center gap-3 w-[38%]">
            <Link href="/">
              <img
                src="https://taxzone.store/wp/wp-content/uploads/2026/02/cropped-WhatsApp-Image-2026-01-28-at-22.09.44-removebg-preview.png"
                alt="taxzone"
                className="h-[52px] md:h-[70px] object-contain hover:scale-[1.03] transition"
              />
            </Link>
          </div>

          {/* SEARCH */}
          <div className="hidden md:block w-[38%]">
            <SearchBar />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end items-center gap-3 w-[24%]">
            <Link href="/cart" className="relative text-2xl hover:scale-110 transition">
              <ShoppingCart
                size={24}
                strokeWidth={1.8}
                className="text-gray-800 hover:text-red-600 transition"
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={onMenuClick}
              className="md:hidden hover:scale-110 transition"
            >
              <Menu size={26} />
            </button>
          </div>

        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>

      </div>
    </div>
  );
}
