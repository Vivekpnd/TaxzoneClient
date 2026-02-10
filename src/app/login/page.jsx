"use client";

import { useState } from "react";
import { loginUser } from "../lib/auth";
import { setToken } from "../lib/token";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);
      setToken(data.token);
      router.push("/my-account");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Username or Email"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
}
