import { NextResponse } from "next/server";

const WC_API = process.env.WC_API_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      cartItems,
      billing,
      token,
      customer_id,
      payment_method,
      payment_method_title,
      set_paid,
    } = body;

    // 🔒 Validate required fields
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    if (!customer_id) {
      return NextResponse.json(
        { message: "Customer ID missing" },
        { status: 401 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    // ✅ Convert customer_id to number (VERY IMPORTANT)
    const numericCustomerId = Number(customer_id);

    if (isNaN(numericCustomerId)) {
      return NextResponse.json(
        { message: "Invalid customer ID" },
        { status: 400 }
      );
    }

    const line_items = cartItems.map((item) => ({
      product_id: Number(item.id),
      quantity: Number(item.quantity),
    }));

    // 🔥 Create WooCommerce Order
    const response = await fetch(
      `${WC_API}/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: numericCustomerId, // ✅ fixed
          payment_method: payment_method || "cod",
          payment_method_title:
            payment_method_title || "Cash on Delivery",
          set_paid: set_paid || false,
          billing,
          shipping: billing,
          line_items,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WooCommerce Error:", data);
      return NextResponse.json(
        {
          message: "Order creation failed",
          error: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        order_id: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
