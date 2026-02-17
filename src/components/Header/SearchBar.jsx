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

  const router = useRouter();
  const wrapperRef = useRef(null);

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <div ref={wrapperRef} className="relative w-full">

      {/* SEARCH BAR */}
      <div className="flex w-full">

        <div className="flex items-center flex-1 border border-gray-300 rounded-l-md bg-white px-3">
          <Search size={18} className="text-gray-500 mr-2" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for products..."
            className="w-full py-2 text-sm outline-none"
          />

          {query && (
            <button onClick={() => setQuery("")}>
              <X size={16} className="text-gray-400 hover:text-gray-700" />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#ea580c] hover:bg-red-700 text-white px-6 text-sm font-semibold rounded-r-md transition"
        >
          SEARCH
        </button>
      </div>

      {/* DROPDOWN */}
      {query.length >= 2 && (
        <div className="absolute z-50 bg-white border w-full mt-1 rounded-md shadow-xl max-h-96 overflow-y-auto">

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
                onClick={() => setQuery("")}
              >
                <Image
                  src={p.images?.[0]?.src || "/placeholder.png"}
                  alt={p.name}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {p.name}
                  </p>

                  <p
                    className="text-xs text-red-600"
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
