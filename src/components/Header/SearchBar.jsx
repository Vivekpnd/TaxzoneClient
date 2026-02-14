"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Autofocus
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/woocommerce/search?q=${query}`);
        const data = await res.json();
        setResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={wrapperRef} className="relative w-full">

      {/* SEARCH CONTAINER */}
      <div
        className={`
          flex items-center
          border rounded-full
          bg-white shadow-sm
          transition-all duration-300
          w-full
          ${open ? "ring-2 ring-orange-500" : ""}
        `}
      >
        <Search size={18} className="ml-3 text-gray-500" />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search products..."
          className="w-full px-3 py-2 text-sm outline-none bg-transparent"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="mr-2 text-gray-400 hover:text-gray-700 transition"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {query.length >= 1 && (
        <div className="absolute z-50 bg-white border w-full mt-2 rounded-xl shadow-xl max-h-96 overflow-y-auto">

          {loading && (
            <p className="p-4 text-sm text-gray-500">Searching...</p>
          )}

          {!loading && results.length === 0 && (
            <p className="p-4 text-sm text-gray-500">No products found</p>
          )}

          {!loading &&
            results.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                onClick={() => {
                  setQuery("");
                }}
              >
                <Image
                  src={p.images?.[0]?.src || "/placeholder.png"}
                  alt={p.name}
                  width={50}
                  height={50}
                  className="rounded-lg object-cover"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800">
                    {p.name}
                  </p>

                  <p
                    className="text-xs text-orange-600"
                    dangerouslySetInnerHTML={{
                      __html: p.price_html,
                    }}
                  />
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
