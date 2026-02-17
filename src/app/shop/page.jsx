import AboutSection from "../../components/AboutSection";
import ProductCard from "../home-content/component/products/ProductCard";
import Link from "next/link";
import { Suspense } from "react";

const WC_API = process.env.WC_API_URL;
const KEY = process.env.WC_CONSUMER_KEY;
const SECRET = process.env.WC_CONSUMER_SECRET;

/* ---------------- FETCH PRODUCTS ---------------- */

async function getProducts({ page = 1, category = null }) {
  try {
    let url = `${WC_API}/products?per_page=24&page=${page}&status=publish`;

    if (category) url += `&category=${category}`;

    url += `&consumer_key=${KEY}&consumer_secret=${SECRET}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const totalPages = Number(res.headers.get("x-wp-totalpages")) || 1;
    const totalProducts = Number(res.headers.get("x-wp-total")) || 0;
    const products = await res.json();

    return {
      products: Array.isArray(products) ? products : [],
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error(error);
    return { products: [], totalPages: 1, totalProducts: 0 };
  }
}

/* ---------------- FETCH CATEGORIES ---------------- */

async function getCategories() {
  try {
    const res = await fetch(
      `${WC_API}/products/categories?per_page=100&hide_empty=true&consumer_key=${KEY}&consumer_secret=${SECRET}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    return await res.json();
  } catch {
    return [];
  }
}

/* ---------------- SKELETON ---------------- */

function ProductGridSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-5
      "
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 animate-pulse"
        >
          <div className="aspect-square bg-gray-200 rounded-t-xl" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- SHOP CONTENT ---------------- */

async function ShopContent({ currentPage, selectedCategory }) {
  const categories = await getCategories();

  const categoryId = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.id
    : null;

  const { products, totalPages, totalProducts } = await getProducts({
    page: currentPage,
    category: categoryId,
  });

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="text-gray-800">Shop</span>{" "}
            <span className="text-orange-600">Products</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalProducts.toLocaleString()} products available
          </p>
        </div>
      </div>

      {/* ================= STICKY FILTER ================= */}
      <div className="sticky top-0 z-20 bg-gray-50 pb-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">

          <Link
            href="/shop"
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
            ${
              !selectedCategory
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white border border-gray-200 hover:border-orange-400 text-gray-700"
            }`}
          >
            All
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${
                selectedCategory === cat.slug
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white border border-gray-200 hover:border-orange-400 text-gray-700"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="mt-8">
        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            No products found.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-5
            "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-14">
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(totalPages, currentPage + 3)
              )
              .map((page) => (
                <Link
                  key={page}
                  href={`/shop?page=${page}${
                    selectedCategory
                      ? `&category=${selectedCategory}`
                      : ""
                  }`}
                  scroll={false}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    page === currentPage
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-white border border-gray-200 hover:border-orange-500 text-gray-700"
                  }`}
                >
                  {page}
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- SHOP PAGE ---------------- */

export default function ShopPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const selectedCategory = searchParams?.category || null;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopContent
            currentPage={currentPage}
            selectedCategory={selectedCategory}
          />
        </Suspense>

      </div>
    </section>
  );
}
