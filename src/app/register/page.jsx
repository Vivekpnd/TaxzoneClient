"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_WP_API;

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      /* =========================
         STEP 1: REGISTER USER
      ========================= */
      const registerRes = await fetch(
        `${API_URL}/wp/v2/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        throw new Error(registerData.message || "Registration failed");
      }

      /* =========================
         STEP 2: AUTO LOGIN (JWT)
      ========================= */
      const loginRes = await fetch(
        `${API_URL}/jwt-auth/v1/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        }
      );

      const loginData = await loginRes.json();

      if (!loginRes.ok || !loginData?.token) {
        throw new Error("Auto login failed");
      }

      /* =========================
         STEP 3: FETCH USER PROFILE
      ========================= */
      const profileRes = await fetch(
        `${API_URL}/wp/v2/users/me`,
        {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
        }
      );

      const profile = await profileRes.json();

      if (!profileRes.ok || !profile?.id) {
        throw new Error("Failed to fetch user profile");
      }

      /* =========================
         STEP 4: STORE AUTH DATA
      ========================= */
      localStorage.setItem("authToken", loginData.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: profile.id,
          email: profile.email,
          name: profile.name,
        })
      );

      /* =========================
         STEP 5: REDIRECT
      ========================= */
      router.push("/Account");

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="font-medium underline hover:text-gray-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
