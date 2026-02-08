"use client";

export default function ShippingAddress() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        2. Shipping Address
      </h2>

      <div className="space-y-4">
        <Input label="Full Address" required />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="City" required />
          <Input label="State" required />
          <Input label="Pincode" required />
        </div>
      </div>
    </div>
  );
}

function Input({ label, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black" />
    </div>
  );
}
