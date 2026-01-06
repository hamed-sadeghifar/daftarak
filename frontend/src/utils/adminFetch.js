const BASE_URL = "http://localhost:5000";

export async function adminFetch(url, options = {}) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // 🔒 اگر توکن مشکل داشت
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("admin_token");
    window.location.href = "/varede-panel-sho";
    return null;
  }

  return res;
}