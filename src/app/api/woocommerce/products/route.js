import { NextResponse } from "next/server";

const API = process.env.WC_API_URL;
const KEY = process.env.WC_CONSUMER_KEY;
const SECRET = process.env.WC_CONSUMER_SECRET;

// 🔁 SLUG → CATEGORY ID MAP
const CATEGORY_MAP = {
  "best-sellers": 15,
  "new-launch": 16,
  "trending-now": 17,
  "recommended-for-you": 18,
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const orderby = searchParams.get("orderby") || "date";

    let query = `?orderby=${orderby}&per_page=8`;

    // ✅ Convert slug → ID
    if (categorySlug && CATEGORY_MAP[categorySlug]) {
      query += `&category=${CATEGORY_MAP[categorySlug]}`;
    }

    const res = await fetch(`${API}/products${query}`, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${KEY}:${SECRET}`).toString("base64"),
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
