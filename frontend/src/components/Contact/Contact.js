import { useState } from "react";
import "./Contact.css";

const API_URL = "http://localhost:5000/api/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <form className="contact-form" onSubmit={submitHandler}>
        <div className="input-group">
          <label>نام</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>ایمیل</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>موضوع</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>پیام</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>

        <button className="send-btn" disabled={status === "loading"}>
          {status === "loading" ? "در حال ارسال..." : "ارسال پیام"}
        </button>

        {status === "success" && (
          <p className="success">پیام با موفقیت ارسال شد ✅</p>
        )}
        {status === "error" && <p className="error">خطا در ارسال پیام ❌</p>}
      </form>
    </section>
  );
}
