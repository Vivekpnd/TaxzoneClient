"use client";

import { useEffect, useState } from "react";

export default function ShippingAddress({ customer, onChange }) {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ Prefill if customer exists
  useEffect(() => {
    if (customer) {
      setForm({
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode: customer.pincode || "",
      });
    }
  }, [customer]);

  // ✅ Send data upward whenever form changes
  useEffect(() => {
    if (onChange) {
      onChange(form);
    }
  }, [form, onChange]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        2. Shipping Address
      </h2>

      <div className="space-y-4">
        <Input
          label="Full Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
          <Input
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />
          <Input
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
