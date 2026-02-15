import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount, currency = "INR" } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // paise
      currency,
      payment_capture: 1, // auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
