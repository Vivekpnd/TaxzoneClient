import AddToCartButton from "../../home-content/component/AddToCartButton";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.WC_STORE_URL}/wp-json/wc/store/products?slug=${slug}`,
    { cache: "no-store" }
  );

  const products = await res.json();
  const product = products?.[0];

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-gray-500 mt-2">Slug: {slug}</p>
      </div>
    );
  }

  // FETCH RELATED PRODUCTS
  const categoryId = product.categories?.[0]?.id;

  const relatedRes = await fetch(
    `${process.env.WC_STORE_URL}/wp-json/wc/store/products?category=${categoryId}&exclude=${product.id}&per_page=4`,
    { cache: "no-store" }
  );

  const relatedProducts = await relatedRes.json();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">

      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-600 transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* IMAGE */}
        <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center overflow-hidden group">
          <img
            src={product.images?.[0]?.src}
            alt={product.name}
            className="max-h-[450px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col">

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div
            className="text-2xl font-semibold text-orange-600 mb-6"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          {/* Short Description */}
          <div
            className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: product.short_description,
            }}
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <div className="flex-1">
              <AddToCartButton product={product} />
            </div>

            <Link
              href="/cart"
              className="flex items-center justify-center border border-gray-300 px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
            >
              Go to Cart
            </Link>

          </div>

        </div>
      </div>

      {/* FULL DESCRIPTION */}
      <div className="mt-20">

        <div className="border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Product Details
          </h2>
        </div>

        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts?.length > 0 && (
        <div className="mt-24">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
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
                <Link
                  href={`/product/${item.slug}`}
                  className="flex flex-col flex-1"
                >
                  <div className="aspect-square bg-gray-50 rounded-t-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={item.images?.[0]?.src}
                      alt={item.name}
                      className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                      {item.name}
                    </h3>

                    <div
                      className="text-sm font-semibold text-orange-600 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: item.price_html,
                      }}
                    />

                  </div>
                </Link>

                <div className="px-4 pb-4">
                  <AddToCartButton product={item} />
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </main>
  );
}
