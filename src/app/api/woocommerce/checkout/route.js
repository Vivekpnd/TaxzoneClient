import { NextResponse } from "next/server";

const WC_API = process.env.WC_API_URL; 
// example: https://taxzone.store/wp-json/wc/v3

const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();

    const { cartItems, billing, token } = body;

    // 🔒 Check login
    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 }
      );
    }

    // 🛒 Validate cart
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    // 🧾 Validate billing
    if (!billing?.first_name || !billing?.email) {
      return NextResponse.json(
        { message: "Billing details missing" },
        { status: 400 }
      );
    }

    // 🔄 Format line items for WooCommerce
    const line_items = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    // 📦 Create order in WooCommerce
    const response = await fetch(
      `${WC_API}/orders?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method: "cod",
          payment_method_title: "Cash on Delivery",
          set_paid: false,
          billing,
          line_items,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WooCommerce Error:", data);
      return NextResponse.json(
        { message: "Order creation failed", error: data },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        order_id: data.id,
        message: "Order placed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
