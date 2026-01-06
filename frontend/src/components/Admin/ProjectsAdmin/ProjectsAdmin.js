import { useEffect, useRef, useState } from "react";
import "./ProjectsAdmin.css";
import { adminFetch } from "../../../utils/adminFetch";

const API_URL = "http://localhost:5000/api/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    desc: "",
    tech: "",
    demo: "",
    imgFile: null,
    imgUrl: "",
    oldImg: "",
  });

  /* ======================
     GET PROJECTS
  ====================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  /* ======================
     SUBMIT (CREATE / UPDATE)
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("desc", formData.desc);
    fd.append("tech", formData.tech);
    fd.append("demo", formData.demo);

    if (formData.id) fd.append("id", formData.id);

    if (formData.imgFile) {
      fd.append("img", formData.imgFile);
    } else if (formData.imgUrl) {
      fd.append("imgUrl", formData.imgUrl);
    } else if (formData.oldImg) {
      fd.append("oldImg", formData.oldImg);
    }

    const res = await adminFetch("/api/projects", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      fetch(API_URL)
        .then((res) => res.json())
        .then(setProjects);

      setFormData({
        id: null,
        title: "",
        desc: "",
        tech: "",
        demo: "",
        imgFile: null,
        imgUrl: "",
      });

      if (fileRef.current) fileRef.current.value = "";
      alert("پروژه ذخیره شد ✅");
    }
  };

  /* ======================
     DELETE
  ====================== */
  const deleteProject = async (id) => {
    if (!window.confirm("حذف پروژه؟")) return;

    const res = await adminFetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("خطا در حذف پروژه");
      return;
    }

    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  /* ======================
     EDIT
  ====================== */
  const editProject = (p) => {
    setFormData({
      id: p._id,
      title: p.title,
      desc: p.desc,
      tech: p.tech.join(", "),
      demo: p.demo,
      imgFile: null,
      imgUrl: "",
      oldImg: p.img,
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="admin-projects">
      <h2 className="admin-title">مدیریت پروژه‌ها</h2>

      {/* ======================
          LIST
      ====================== */}
      <div className="admin-projects-list">
        {projects.map((p) => (
          <div className="admin-project-card" key={p._id}>
            <img
              src={
                p.img?.startsWith("http")
                  ? p.img
                  : `http://localhost:5000${p.img}`
              }
              alt={p.title}
            />

            <div className="admin-project-info">
              <h4>{p.title}</h4>
              <p>{p.desc}</p>

              <div className="admin-tech">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="admin-project-actions">
              <button className="edit-btn" onClick={() => editProject(p)}>
                ویرایش
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteProject(p._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================
          FORM
      ====================== */}
      <form onSubmit={handleSubmit} className="admin-project-form">
        <h3>افزودن / ویرایش پروژه</h3>

        <input
          placeholder="عنوان پروژه"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="توضیحات پروژه"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          required
        />

        {/* Upload */}
        <input
          type="file"
          ref={fileRef}
          onChange={(e) =>
            setFormData({ ...formData, imgFile: e.target.files[0] })
          }
        />

        {/* URL */}
        <input
          type="text"
          placeholder="یا لینک تصویر"
          value={formData.imgUrl}
          onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
        />

        <input
          type="text"
          placeholder="تکنولوژی‌ها (React, Node, ...)"
          value={formData.tech}
          onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
        />

        <input
          type="text"
          placeholder="لینک دمو"
          value={formData.demo}
          onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
        />

        <button className="save-btn">ذخیره پروژه</button>
      </form>
    </div>
  );
}
