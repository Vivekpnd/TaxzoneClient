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
    <div className="bg-gray-100 text-gray-600 text-xs md:text-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 hover:text-orange-600 transition"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">+1 800 123 4567</span>
          </a>

          <a
            href="mailto:info@taxzone.com"
            className="hidden md:flex items-center gap-2 hover:text-orange-600 transition"
          >
            <Mail size={14} />
            info@taxzone.com
          </a>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* DESKTOP */}
          <Link
            href={loggedIn ? "/my-account" : "/login"}
            className="hidden md:flex items-center gap-2 hover:text-orange-600 transition"
          >
            <User size={14} />
            My Account
          </Link>

          <Link
            href="/wishlist"
            className="hidden md:flex items-center gap-2 hover:text-orange-600 transition"
          >
            <Heart size={14} />
            Wishlist
          </Link>

          {/* MOBILE ICONS */}
          <Link
            href={loggedIn ? "/my-account" : "/login"}
            className="md:hidden hover:text-orange-600 transition"
          >
            <User size={18} />
          </Link>

          <Link
            href="/wishlist"
            className="md:hidden hover:text-orange-600 transition"
          >
            <Heart size={18} />
          </Link>

        </div>
      </div>
    </div>
  );
}
