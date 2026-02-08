"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="space-y-4">
          <img
            src="https://taxzone.store/wp/wp-content/uploads/2026/02/cropped-WhatsApp-Image-2026-01-28-at-22.09.44-removebg-preview.png"
            alt="TaxZone"
            className="h-14 w-auto"
          />

          <p className="text-sm text-neutral-400 leading-relaxed">
            TaxZone is your trusted destination for quality products,
            best deals, and fast delivery — built for modern shoppers.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 pt-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 transition-transform hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4 className="text-white font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Best Sellers",
              "New Launch",
              "Trending Products",
              "Recommended For You",
              "Groceries",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="/shop"
                  className="hover:text-white hover:translate-x-1 inline-block transition"
                >
                  → {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
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
                  className="hover:text-white hover:translate-x-1 inline-block transition"
                >
                  → {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
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
                  className="hover:text-white hover:translate-x-1 inline-block transition"
                >
                  → {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 text-sm text-neutral-400">
            📞 +1 800 123 4567 <br />
            ✉ info@taxzone.store
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-400">
          <p>
            © {new Date().getFullYear()} <span className="text-white">TaxZone</span>. All rights reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Built with ❤️ using Next.js & WooCommerce
          </p>
        </div>
      </div>
    </footer>
  );
}
