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
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">

      {/* SEARCH BAR */}
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm 
                      focus-within:ring-2 focus-within:ring-[#f97316] 
                      focus-within:border-[#f97316] 
                      transition-all duration-300">

        {/* ICON */}
        <Search size={18} className="text-[#f97316] mr-3" />

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search Products, Brands and More..."
          className="flex-1 bg-transparent text-sm md:text-base text-gray-800 outline-none placeholder:text-gray-400"
        />

        {/* CLEAR BUTTON */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-2 p-1 rounded-full hover:bg-orange-100 transition"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="ml-3 bg-[#f97316] hover:bg-[#ea580c] 
                     text-white text-sm font-semibold 
                     px-6 py-2 rounded-full transition 
                     hidden sm:block"
        >
          Search
        </button>
      </div>

      {/* DROPDOWN */}
      {query.length >= 2 && (
        <div className="absolute z-50 bg-white w-full mt-3 rounded-2xl shadow-2xl 
                        border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">

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
                className="flex items-center gap-4 p-4 hover:bg-orange-50 transition"
                onClick={() => setQuery("")}
              >
                <Image
                  src={p.images?.[0]?.src || "/placeholder.png"}
                  alt={p.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover border border-gray-100"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {p.name}
                  </p>

                  <p
                    className="text-sm font-semibold text-[#f97316]"
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
}"use client";

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
          className="bg-red-600 hover:bg-red-700 text-white px-6 text-sm font-semibold rounded-r-md transition"
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
