"use client";

export default function PaymentMethod() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        3. Payment Method
      </h2>

      <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
        <input type="radio" checked readOnly />
        <div>
          <p className="font-medium">Cash on Delivery</p>
          <p className="text-sm text-gray-500">
            Pay when your order arrives
          </p>
        </div>
      </label>
    </div>
  );
}
