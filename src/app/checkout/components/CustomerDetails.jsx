"use client";

export default function CustomerDetails() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        1. Customer Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" required />
        <Input label="Last Name" required />
        <Input label="Email" type="email" required />
        <Input label="Phone" required />
      </div>
    </div>
  );
}

function Input({ label, type = "text", required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
