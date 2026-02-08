import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import { getCategoryIdBySlug } from "../../../lib/woocommerce";

export default async function ProductGrid({ title, slug, limit = 8 }) {
  const categoryId = await getCategoryIdBySlug(slug);

  if (!categoryId) {
    return (
      <section className="mb-12">
        <h2 className="text-xl font-bold">{title}</h2>
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
      <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
        {title}
      </h2>

      {/* MOBILE: horizontal scroll | DESKTOP: grid */}
      <div
        className="
          flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory
          md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-10 md:overflow-visible
        "
      >
        {products.map((p) => {
          const image =
            p.images?.[0]?.src || "https://via.placeholder.com/500";

          return (
            <div
              key={p.id}
              className="
                min-w-[80%] sm:min-w-[55%] md:min-w-0
                bg-white rounded-lg
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                transition snap-start
              "
            >
              <Link href={`/product/${p.slug}`}>
                {/* IMAGE */}
                <div className="p-6">
                  <div className="relative h-48 w-full">
                    <Image
                      src={image}
                      alt={p.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                    {p.name}
                  </h3>

                  {p.price_html && (
                    <div
                      className="text-sm text-gray-500 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: p.price_html,
                      }}
                    />
                  )}

                  <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {p.short_description
                      ?.replace(/(<([^>]+)>)/gi, "") ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."}
                  </p>

                  {/* CTA */}
                  <div className="flex justify-center">
                    <AddToCartButton product={p} />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
