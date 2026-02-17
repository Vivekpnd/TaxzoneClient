export async function getCategoryIdBySlug(slug) {
  if (!slug) return null;

  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${process.env.WC_API_URL}/products/categories?slug=${slug}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("WooCommerce Error:", await res.text());
    return null;
  }

  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    console.error("Category slug not found:", slug);
    return null;
  }

  return data[0].id;
}
