import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { orderId, email } = await req.json();

    if (!orderId || !email) {
      return NextResponse.json(
        { success: false, message: "Order ID and Email are required" },
        { status: 400 }
      );
    }

    const cleanOrderId = orderId.toString().replace("#", "");

    const wooResponse = await fetch(
      `${process.env.WC_API_URL}/orders/${cleanOrderId}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64"),
        },
      }
    );

    if (!wooResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const order = await wooResponse.json();

    if (order.billing.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: "Email does not match this order" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
        currency: order.currency,
        date_created: order.date_created,
        billing: order.billing,
        line_items: order.line_items,
      },
    });

  } catch (error) {
    console.error("Track Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
