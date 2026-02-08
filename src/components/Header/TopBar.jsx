'use client'

import { Phone, Mail, User, Heart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-neutral-900 text-neutral-300 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-white transition">
            <Phone size={14} />
            +1 800 123 4567
          </span>

          <span className="hidden md:flex items-center gap-1 hover:text-white transition">
            <Mail size={14} />
            info@autoparts.com
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <a className="hidden md:flex items-center gap-1 hover:text-white transition">
            <User size={14} />
            My Account
          </a>

          <a className="hidden md:flex items-center gap-1 hover:text-white transition">
            <Heart size={14} />
            Wishlist
          </a>

          {/* MOBILE ICONS */}
          <a className="md:hidden hover:scale-110 transition">
            <User size={18} />
          </a>

          <a className="md:hidden hover:scale-110 transition">
            <Heart size={18} />
          </a>
        </div>

      </div>
    </div>
  )
}
