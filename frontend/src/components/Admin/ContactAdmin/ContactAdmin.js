import { useEffect, useState } from "react";
import "./ContactAdmin.css";

const API_URL = "http://localhost:5000/api/contact";

export default function ContactAdmin() {
  const token = localStorage.getItem("admin_token");
  const [messages, setMessages] = useState([]);

  // ======================
  // GET messages
  // ======================
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔐 هندل 403
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        window.location.href = "/varede-panel-sho";
        return;
      }

      if (res.status === 403) {
        alert("دسترسی غیرمجاز");
        return;
      }

      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, [token]);

  // ======================
  // DELETE message
  // ======================
  const deleteMessage = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔐 هندل 403
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/varede-panel-sho";
      return;
    }

    if (res.status === 403){
      alert("دسترسی غیرمجاز")
      return;
    }

    if (!res.ok) {
      alert("خطا در حذف پیام");
      return;
    }

    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  // ======================
  // MARK AS READ
  // ======================
  const markRead = async (id) => {
    const res = await fetch(`${API_URL}/${id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔐 هندل 403
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/varede-panel-sho";
      return;
    }

    if (res.status === 403){
      alert("دسترسی غیرمجاز")
      return;
    }

    if (!res.ok) {
      alert("خطا در بروزرسانی پیام");
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
    );
  };

  return (
    <div className="admin-contact">
      <h2 className="admin-title">پیام‌های دریافتی</h2>

      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`message-box ${msg.isRead ? "read" : ""}`}
        >
          <h4>{msg.subject}</h4>
          <p>
            <strong>{msg.name}</strong> — {msg.email}
          </p>
          <p>{msg.message}</p>

          <div className="actions">
            {!msg.isRead && (
              <button onClick={() => markRead(msg._id)}>خوانده شد</button>
            )}
            <button
              className="delete-btn"
              onClick={() => deleteMessage(msg._id)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
