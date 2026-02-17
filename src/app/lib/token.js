export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
};
