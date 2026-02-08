import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const res = await fetch(
    `${process.env.WC_STORE_URL}/wp-json/wc/store/products?search=${query}&per_page=8`,
    {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
