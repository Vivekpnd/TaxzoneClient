import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { orderId, email } = await req.json();

  const auth = Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${process.env.WC_API_URL}/orders/${orderId}`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Invalid order details" },
      { status: 400 }
    );
  }

  const order = await res.json();

  // Verify email matches billing email
  if (order.billing.email.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json(
      { error: "Invalid order details" },
      { status: 400 }
    );
  }

  return NextResponse.json(order);
}
