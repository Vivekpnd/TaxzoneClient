"use client";

import CustomerDetails from "./CustomerDetails";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import PlaceOrderButton from "./PlaceOrderButton";

export default function CheckoutLayout() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerDetails />
          <ShippingAddress />
          <PaymentMethod />
          <PlaceOrderButton />
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>

      </div>
    </div>
  );
}
