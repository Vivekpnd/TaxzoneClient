import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer");

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const auth = Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await fetch(
      `${process.env.WC_API_URL}/orders?customer=${customerId}&per_page=20`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: text },
        { status: response.status }
      );
    }

    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
