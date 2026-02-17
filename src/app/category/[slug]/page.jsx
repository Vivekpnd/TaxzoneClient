import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../home-content/component/AddToCartButton";
import { getCategoryIdBySlug } from "../../lib/woocommerce";

export default async function CategoryPage({ params }) {
  const { slug } = params;

  const categoryId = await getCategoryIdBySlug(slug);

  if (!categoryId) {
    return (
      <div className="px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Category Not Found
        </h1>
        <Link href="/" className="text-orange-600">
          Back to Home
        </Link>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.WC_API_URL}/products?category=${categoryId}&per_page=100&status=publish&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    { cache: "no-store" }
  );

  const products = await res.json();

  return (
    <main className="px-4 md:px-8 lg:px-12 py-10">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange-600 transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize text-gray-700">{slug.replace(/-/g, " ")}</span>
      </div>

      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 capitalize">
            {slug.replace(/-/g, " ")}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Showing {products.length} products
          </p>
        </div>

        {/* Future Filter / Sort Placeholder */}
        <div className="text-sm text-gray-500">
          Sort by: <span className="font-medium text-gray-700">Latest</span>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p) => {
          const image =
            p.images?.[0]?.src || "https://via.placeholder.com/600";

          return (
            <div
              key={p.id}
              className="
                group
                bg-white
                border border-gray-100
                rounded-xl
                hover:shadow-md
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Clickable Area */}
              <Link
                href={`/product/${p.slug}`}
                className="flex flex-col flex-1"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">

                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                    {p.name}
                  </h3>

                  {p.price_html && (
                    <div
                      className="text-sm font-semibold text-orange-600 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: p.price_html,
                      }}
                    />
                  )}

                  <p className="text-xs text-gray-500 line-clamp-2 flex-1">
                    {p.short_description
                      ?.replace(/(<([^>]+)>)/gi, "")
                      .slice(0, 90) ||
                      "Premium quality protection for durability and all-weather performance."}
                  </p>

                </div>
              </Link>

              {/* Add to Cart */}
              <div className="px-4 pb-4">
                <AddToCartButton product={p} />
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
