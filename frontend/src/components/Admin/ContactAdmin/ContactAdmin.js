import { useEffect, useState } from "react";
import "./ContactAdmin.css";
import { adminFetch } from '../../../utils/adminFetch'

export default function ContactAdmin() {
  const [messages, setMessages] = useState([]);

  // ======================
  // GET messages
  // ======================
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await adminFetch("/api/contact");

      if (!res) return;

      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  // ======================
  // DELETE message
  // ======================
  const deleteMessage = async (id) => {
    const res = await adminFetch(`/api/contact/${id}`, {
      method: "DELETE"
    });

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
    const res = await adminFetch(`/api/contact/${id}/read`, {
      method: "PATCH"
    });

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
