import { useEffect, useState } from "react";
import "./AboutAdmin.css";

const API_URL = "http://localhost:5000/api/about";

export default function AboutAdmin() {
  const token = localStorage.getItem("admin_token");
  const [formData, setFormData] = useState({
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
  });

  const [loading, setLoading] = useState(true);

  /* ======================
     GET about data
  ====================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            paragraph1: data.paragraph1 || "",
            paragraph2: data.paragraph2 || "",
            paragraph3: data.paragraph3 || "",
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* ======================
     SAVE / UPDATE about
  ====================== */
  const saveAbout = async (e) => {
    e.preventDefault();

    const res = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/varede-panel-sho";
      return;
    }

    if (res.status === 403){
      alert("دسترسی غیرمجاز")
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "خطا در ذخیره اطلاعات");
      return;
    }

    alert("اطلاعات درباره من با موفقیت ذخیره شد ✅");
  };

  if (loading) {
    return <p style={{ color: "#00ffcc" }}>در حال بارگذاری...</p>;
  }

  return (
    <div className="about-admin">
      <h2 className="admin-title">مدیریت بخش درباره من</h2>

      <form className="about-admin-form" onSubmit={saveAbout}>
        <label>پاراگراف اول</label>
        <textarea
          value={formData.paragraph1}
          onChange={(e) =>
            setFormData({ ...formData, paragraph1: e.target.value })
          }
          placeholder="پاراگراف اول..."
        />

        <label>پاراگراف دوم</label>
        <textarea
          value={formData.paragraph2}
          onChange={(e) =>
            setFormData({ ...formData, paragraph2: e.target.value })
          }
          placeholder="پاراگراف دوم..."
        />

        <label>پاراگراف سوم</label>
        <textarea
          value={formData.paragraph3}
          onChange={(e) =>
            setFormData({ ...formData, paragraph3: e.target.value })
          }
          placeholder="پاراگراف سوم..."
        />

        <button type="submit" className="save-btn">
          ذخیره / بروزرسانی
        </button>
      </form>
    </div>
  );
}
