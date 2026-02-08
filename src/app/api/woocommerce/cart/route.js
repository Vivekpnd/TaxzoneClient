import { NextResponse } from "next/server";

const WC_CART_URL =
  "https://taxzone.store/wp/wp-json/wc/store/cart";

export async function GET(req) {
  const cookie = req.headers.get("cookie") || "";

  const res = await fetch(WC_CART_URL, {
    headers: {
      Cookie: cookie, // 🔥 THIS IS THE KEY
    },
    credentials: "include",
  });

  const data = await res.json();

  const response = NextResponse.json(data);

  // 🔥 forward Woo cookies back to browser
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

export async function POST(req) {
  const cookie = req.headers.get("cookie") || "";
  const body = await req.json();

  const res = await fetch(`${WC_CART_URL}/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie, // 🔥 REQUIRED
    },
    credentials: "include",
    body: JSON.stringify({
      id: body.product_id,
      quantity: body.quantity || 1,
    }),
  });

  const data = await res.json();

  const response = NextResponse.json(data);

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
