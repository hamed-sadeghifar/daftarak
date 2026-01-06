import { useEffect, useState } from "react";
import "./SidebarAdmin.css";

const API_URL = "http://localhost:5000/api/sidebar";

export default function SidebarAdmin() {
  const token = localStorage.getItem("admin_token");
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    telegram: "",
    instagram: "",
    linkedin: "",
    github: "",
    email: "",
    phone: "",
  });

  /* =====================
     GET sidebar data
  ===================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => data && setForm(data));
  }, []);

  /* =====================
     SAVE sidebar
  ===================== */
  const saveSidebar = async () => {
    const res = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/varede-panel-sho";
      return;
    }

    if (res.status === 403) {
      alert("دسترسی غیرمجاز");
      return;
    }

    if (res.ok) alert("تنظیمات سایدبار ذخیره شد ✅");
  };

  return (
    <div className="admin-sidebar-settings">
      <h2 className="admin-title">تنظیمات سایدبار</h2>

      <div className="admin-sidebar-form">
        <h4>اطلاعات شخصی</h4>

        <input
          placeholder="نام"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="عنوان شغلی"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="توضیح کوتاه"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <h4>لینک‌ها</h4>

        <input
          placeholder="Telegram"
          value={form.telegram || ""}
          onChange={(e) => setForm({ ...form, telegram: e.target.value })}
        />
        <input
          placeholder="Instagram"
          value={form.instagram || ""}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
        />
        <input
          placeholder="LinkedIn"
          value={form.linkedin || ""}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
        />
        <input
          placeholder="GitHub"
          value={form.github || ""}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button className="save-btn" onClick={saveSidebar}>
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
