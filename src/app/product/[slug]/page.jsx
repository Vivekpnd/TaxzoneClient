import AddToCartButton from "../../home-content/component/AddToCartButton";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.WC_STORE_URL}/wp-json/wc/store/products?slug=${slug}`,
    { cache: "no-store" }
  );

  const products = await res.json();
  const product = products?.[0];

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-gray-500">Slug: {slug}</p>
      </div>
    );
  }

  // ✅ FETCH RELATED PRODUCTS
  const categoryId = product.categories?.[0]?.id;

  const relatedRes = await fetch(
    `${process.env.WC_STORE_URL}/wp-json/wc/store/products?category=${categoryId}&exclude=${product.id}&per_page=4`,
    { cache: "no-store" }
  );

  const relatedProducts = await relatedRes.json();

  return (
    <div className="container mx-auto py-14 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div className="group border rounded-xl overflow-hidden">
          <img
            src={product.images?.[0]?.src}
            alt={product.name}
            className="w-full h-[420px] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product.name}
          </h1>

          <div
            className="text-2xl text-green-600 font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{
              __html: product.short_description,
            }}
          />

          <div className="flex gap-4">
            <AddToCartButton product={product} />

            <Link
              href="/cart"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Product Description
        </h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      {relatedProducts?.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
              >
                <Link href={`/product/${item.slug}`}>
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.images?.[0]?.src}
                      alt={item.name}
                      className="h-full object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </h3>

                  <div
                    className="text-green-600 font-semibold mt-1"
                    dangerouslySetInnerHTML={{
                      __html: item.price_html,
                    }}
                  />

                  <div className="mt-3">
                    <AddToCartButton product={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
