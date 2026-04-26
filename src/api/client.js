const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getRestaurant: () => request("/restaurant"),
  getCategories: () => request("/categories"),
  getMenu: (category = "All") =>
    request(`/menu${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`),
  getMenuItem: (id) => request(`/menu/${id}`),
  checkoutPreview: (payload) =>
    request("/checkout/preview", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
