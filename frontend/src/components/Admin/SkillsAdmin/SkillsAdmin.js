import { useEffect, useState } from "react";
import "./SkillsAdmin.css";
import { adminFetch } from '../../../utils/adminFetch'

const API_URL = "http://localhost:5000/api/skills";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "technical",
    logoType: "url",
    logo: "",
    file: null,
    link: "",
  });

  /* =====================
     GET skills
  ===================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  /* =====================
     SAVE skill (add / edit)
  ===================== */
  const saveSkill = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("logoType", form.logoType);
    formData.append("link", form.link);

    if (form.logoType === "svg" && form.file) {
      formData.append("logo", form.file);
    } else {
      formData.append("logo", form.logo);
    }

    const res = await adminFetch(editingId ? `/api/skills/${editingId}` : "/api/skills", {
      method: editingId ? "PATCH" : "POST",
      body: formData,
    });
    if (!res) return;

    const data = await res.json();

    if (editingId) {
      setSkills((prev) => prev.map((s) => (s._id === editingId ? data : s)));
    } else {
      setSkills((prev) => [data, ...prev]);
    }

    resetForm();
  };

  /* =====================
     DELETE skill
  ===================== */
  const deleteSkill = async (id) => {
    if (!window.confirm("حذف این مهارت؟")) return;

    const res = await adminFetch(`/api/skills/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("خطا در حذف مهارت");
      return;
    }

    setSkills((prev) => prev.filter((s) => s._id !== id));
  };

  /* =====================
     START edit
  ===================== */
  const startEdit = (skill) => {
    setEditingId(skill._id);
    setForm({
      name: skill.name,
      type: skill.type,
      logoType: skill.logoType || "url",
      logo: skill.logo || "",
      file: null,
      link: skill.link || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      type: "technical",
      logoType: "url",
      logo: "",
      file: null,
      link: "",
    });
  };

  const technicalSkills = skills.filter((s) => s.type === "technical");
  const softSkills = skills.filter((s) => s.type === "soft");

  return (
    <div className="skills-admin">
      <h2>مدیریت مهارت‌ها</h2>

      {/* ===== لیست مهارت‌های فنی ===== */}
      <div className="admin-box">
        <h3>مهارت‌های فنی</h3>

        {technicalSkills.map((skill) => (
          <div className="technical-row" key={skill._id}>
            {/* logo */}
            {skill.logo && (
              <img
                src={
                  skill.logo.startsWith("http")
                    ? skill.logo
                    : `http://localhost:5000${skill.logo}`
                }
                alt={skill.name}
                className="skill-logo"
              />
            )}

            <span className="skill-name">{skill.name}</span>

            <div className="actions">
              <button onClick={() => startEdit(skill)}>ویرایش</button>
              <button
                onClick={() => deleteSkill(skill._id)}
                className="delete-btn"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== لیست مهارت‌های نرم ===== */}
      <div className="admin-box">
        <h3>مهارت‌های نرم</h3>

        {softSkills.map((skill) => (
          <div className="soft-row" key={skill._id}>
            <span className="skill-name">{skill.name}</span>

            <div className="actions">
              <button onClick={() => startEdit(skill)}>ویرایش</button>
              <button
                onClick={() => deleteSkill(skill._id)}
                className="delete-btn"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== فرم افزودن / ویرایش ===== */}
      <form className="admin-box" onSubmit={saveSkill}>
        <h3>{editingId ? "ویرایش مهارت" : "افزودن مهارت"}</h3>

        <input
          placeholder="نام مهارت"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="technical">فنی</option>
          <option value="soft">نرم</option>
        </select>

        {form.type === "technical" && (
          <>
            <select
              value={form.logoType}
              onChange={(e) => setForm({ ...form, logoType: e.target.value })}
            >
              <option value="url">لینک لوگو</option>
              <option value="svg">آپلود SVG</option>
            </select>

            {form.logoType === "url" ? (
              <input
                placeholder="لینک لوگو"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
              />
            ) : (
              <input
                type="file"
                accept=".svg"
                onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
              />
            )}

            <input
              placeholder="لینک مرجع"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </>
        )}

        <button className="add-btn">
          {editingId ? "ثبت ویرایش" : "افزودن مهارت"}
        </button>
      </form>
    </div>
  );
}
