'use client';

import { Phone, Mail, User, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="bg-gray-50 border-b text-[11px] sm:text-xs md:text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Phone */}
          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 hover:text-red-600 transition-colors duration-200"
          >
            <Phone size={14} />
            <span className="hidden sm:inline font-medium">
              +1 800 123 4567
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:ssenterpiseswebsite1@gmail.com"
            className="hidden md:flex items-center gap-2 hover:text-red-600 transition-colors duration-200"
          >
            <Mail size={14} />
            <span className="font-medium">
              ssenterpiseswebsite1@gmail.com
            </span>
          </a>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Desktop My Account */}
          <Link
            href={loggedIn ? "/account" : "/login"}
            className="hidden md:flex items-center gap-2 hover:text-red-600 transition-colors duration-200"
          >
            <User size={14} />
            <span className="font-medium">
              {loggedIn ? "My Account" : "Sign In"}
            </span>
          </Link>

          {/* Desktop Wishlist */}
          <Link
            href="/wishlist"
            className="hidden md:flex items-center gap-2 hover:text-red-600 transition-colors duration-200"
          >
            <Heart size={14} />
            <span className="font-medium">
              Wishlist
            </span>
          </Link>

          {/* MOBILE ICONS */}
          <Link
            href={loggedIn ? "/account" : "/login"}
            className="md:hidden hover:text-red-600 transition-colors duration-200"
          >
            <User size={18} />
          </Link>

          <Link
            href="/wishlist"
            className="md:hidden hover:text-red-600 transition-colors duration-200"
          >
            <Heart size={18} />
          </Link>

        </div>
      </div>
    </div>
  );
}
