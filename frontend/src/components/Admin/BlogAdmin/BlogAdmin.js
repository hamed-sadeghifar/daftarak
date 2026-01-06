import { useEffect, useState, useRef } from "react";
import "./BlogAdmin.css";
import { adminFetch } from "../../../utils/adminFetch";

const API_URL = "http://localhost:5000/api/blogs";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    source: "",
    content: "",
    coverUrl: "",
    cover: null,
    oldCover: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const savePost = async () => {
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("source", form.source);
    fd.append("content", form.content);

    if (form.id) fd.append("id", form.id);

    if (form.cover) {
      fd.append("cover", form.cover);
    } else if (form.coverUrl) {
      fd.append("coverUrl", form.coverUrl);
    } else if (form.oldCover) {
      fd.append("oldCover", form.oldCover); // 👈 مهم
    }

    const res = await adminFetch("/api/blogs", {
      method: "POST",
      headers: {},
      body: fd,
    });

    if (res.ok) {
      fetch(API_URL)
        .then((res) => res.json())
        .then(setPosts);
      setForm({
        id: null,
        title: "",
        source: "",
        content: "",
        coverUrl: "",
        cover: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      alert("مقاله ذخیره شد ✅");
    }
  };

  const deletePost = async (id) => {
    const res = await adminFetch(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: {},
    });

    if (!res.ok) {
      alert("خطا در حذف پست");
      return;
    }
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-blog">
      <h2 className="admin-title">مدیریت وبلاگ</h2>

      <div className="admin-blog-list">
        {posts.map((p) => (
          <div key={p._id} className="admin-blog-card">
            <img
              src={
                p.cover?.startsWith("http")
                  ? p.cover
                  : `http://localhost:5000${p.cover}`
              }
              alt={p.title}
            />
            <div>
              <h4>{p.title}</h4>
              <span>{p.source}</span>
            </div>
            <div>
              <button
                onClick={() =>
                  setForm({
                    id: p._id,
                    title: p.title,
                    source: p.source,
                    content: p.content,
                    cover: null,
                    coverUrl: "",
                    oldCover: p.cover, // 👈 عکس قبلی
                  })
                }
              >
                ویرایش
              </button>
              <button onClick={() => deletePost(p._id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-blog-form">
        <h3>افزودن / ویرایش</h3>

        <input
          placeholder="عنوان"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="منبع"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setForm({ ...form, cover: e.target.files[0] })}
        />
        <input
          placeholder="یا لینک کاور"
          value={form.coverUrl}
          onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
        />

        <textarea
          placeholder="محتوا"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button onClick={savePost}>ذخیره مقاله</button>
      </div>
    </div>
  );
}
