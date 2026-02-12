"use client";

export default function CustomerDetails({ customer, setCustomer }) {
  const handleChange = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        1. Customer Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          required
          value={customer.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />

        <Input
          label="Last Name"
          required
          value={customer.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          required
          value={customer.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Phone"
          required
          value={customer.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
    </div>
  );
}

function Input({ label, type = "text", required, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
