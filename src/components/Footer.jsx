"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] text-gray-400 border-t border-neutral-800">

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND COLUMN */}
        <div className="space-y-6">
          <img
            src="https://backend.taxzone.store/wp/wp-content/uploads/2026/02/cropped-WhatsApp-Image-2026-01-28-at-22.09.44-removebg-preview.png"
            alt="TaxZone"
            className="h-16 w-auto"
          />

          <p className="text-sm leading-relaxed text-gray-500">
            Premium products. Trusted service. Fast delivery.
            Built for a modern shopping experience.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 pt-2">
            {[
              { Icon: FaFacebookF },
              { Icon: FaInstagram },
              { Icon: FaTwitter },
              { Icon: FaYoutube },
            ].map(({ Icon }, i) => (
              <a
                key={i}
                href="#"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 hover:border-red-500 transition-all duration-300"
              >
                <Icon
                  size={15}
                  className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">
            Categories
          </h4>

          <ul className="space-y-3 text-sm">
            {[
              "Best Sellers",
              "New Launch",
              "Trending Products",
              "Recommended",
              "Groceries",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="/shop"
                  className="block hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Cart", href: "/cart" },
              { label: "My Account", href: "/account" },
              { label: "Wishlist", href: "/wishlist" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">
            Support
          </h4>

          <ul className="space-y-3 text-sm mb-6">
            {[
              "FAQs",
              "Shipping & Returns",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="/contact"
                  className="block hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* CONTACT */}
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <FiPhone className="text-red-500" size={16} />
              <span>+1 800 123 4567</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-red-500" size={16} />
              <span>info@taxzone.store</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">TaxZone</span>. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0 text-center md:text-right">
            Powered by VsolTech
          </p>
        </div>
      </div>
    </footer>
  );
}
