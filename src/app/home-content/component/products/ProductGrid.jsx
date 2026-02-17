import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import { getCategoryIdBySlug } from "../../../lib/woocommerce";

export default async function ProductGrid({ title, slug, limit = 8 }) {
  const categoryId = await getCategoryIdBySlug(slug);

  if (!categoryId) {
    return (
      <section className="mb-12 px-4 md:px-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-red-600">Category not found: {slug}</p>
      </section>
    );
  }

  const res = await fetch(
    `${process.env.WC_API_URL}/products?category=${categoryId}&per_page=${limit}&status=publish&consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
    { cache: "no-store" }
  );

  const products = await res.json();
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <section className="mb-20">

      {/* Section Title */}
      <div className="px-4 md:px-0 mb-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>

      {/* Products Container */}
      <div
        className="
          no-scrollbar
          flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 pb-4
          md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-6 md:overflow-visible md:px-0
        "
      >
        {products.map((p) => {
          const image =
            p.images?.[0]?.src || "https://via.placeholder.com/600";

          return (
            <div
              key={p.id}
              className="
                group
                min-w-[70%] sm:min-w-[45%] md:min-w-0
                bg-white
                border border-gray-100
                rounded-xl
                hover:shadow-md
                transition-all duration-300
                snap-start
                flex flex-col
              "
            >
              {/* Clickable Area */}
              <Link
                href={`/product/${p.slug}`}
                className="flex flex-col flex-1"
              >
                {/* Image (smaller + balanced ratio) */}
                <div className="relative w-full aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 70vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">

                  {/* Product Name */}
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                    {p.name}
                  </h3>

                  {/* Price */}
                  {p.price_html && (
                    <div
                      className="text-sm font-semibold text-orange-600 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: p.price_html,
                      }}
                    />
                  )}

                  {/* Short Description (Shortened for UX) */}
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
    </section>
  );
}
