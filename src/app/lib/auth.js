const API_URL = process.env.NEXT_PUBLIC_WP_API;

/* =========================
   REGISTER USER
========================= */
export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API_URL}/wp/v2/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

/* =========================
   LOGIN USER (JWT)
========================= */
export async function loginUser({ username, password }) {
  const res = await fetch(`${API_URL}/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (typeof window !== "undefined") {
    // Store token
    localStorage.setItem("token", data.token);

    // Store structured user info
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.user_email,
        name: data.user_display_name,
        nicename: data.user_nicename,
      })
    );
  }

  return data;
}

/* =========================
   GET TOKEN
========================= */
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

/* =========================
   GET LOGGED USER
========================= */
export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/* =========================
   CHECK AUTH
========================= */
export function isAuthenticated() {
  return !!getToken();
}

/* =========================
   LOGOUT
========================= */
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}
