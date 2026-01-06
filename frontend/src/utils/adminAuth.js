import { jwtDecode } from "jwt-decode";

export function isAdminLoggedIn() {
  const token = localStorage.getItem("admin_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("admin_token");
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
