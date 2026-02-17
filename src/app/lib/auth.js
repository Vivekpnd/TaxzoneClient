const API_URL = process.env.NEXT_PUBLIC_WP_API;

/* =========================
   REGISTER USER
========================= */
export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API_URL}/wp/v2/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

/* =========================
   LOGIN USER (JWT + REAL USER PROFILE)
========================= */
export async function loginUser({ username, password }) {
  if (!API_URL) {
    throw new Error("API URL not configured");
  }

  /* STEP 1: Get JWT Token */
  const res = await fetch(`${API_URL}/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok || !data?.token) {
    throw new Error(data.message || "Login failed");
  }

  /* STEP 2: Fetch actual WP user profile */
  const profileRes = await fetch(`${API_URL}/wp/v2/users/me`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  const profile = await profileRes.json();

  if (!profileRes.ok || !profile?.id) {
    throw new Error("Failed to fetch user profile");
  }

  /* STEP 3: Save token + correct user */
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: profile.id,          // ✅ Required for checkout
        email: profile.email,
        name: profile.name,
      })
    );
  }

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
  };
}

/* =========================
   GET USER (SAFE VERSION)
========================= */
export function getUser() {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    const parsed = JSON.parse(storedUser);

    // ❗ Critical check for checkout
    if (!parsed?.id) return null;

    return parsed;
  } catch (error) {
    console.error("Invalid user in localStorage");
    return null;
  }
}

/* =========================
   GET TOKEN
========================= */
export function getToken() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  return token;
}

/* =========================
   CHECK AUTH (OPTIONAL HELPER)
========================= */
export function isAuthenticated() {
  const token = getToken();
  const user = getUser();
  return !!(token && user?.id);
}

/* =========================
   LOGOUT
========================= */
export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
}
