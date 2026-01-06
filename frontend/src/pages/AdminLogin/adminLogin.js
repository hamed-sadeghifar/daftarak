import "./adminLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("admin_token", data.token);
          navigate("/varede-panel-shodam");
        } else {
          alert("ایمیل یا پسورد اشتباه است");
        }
      });
  }

  return (
    <div className="admin-loggin">
      <h2 className="admin-title">ورود ادمین</h2>

      <form className="admin-loggin-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="ایمیل ادمین"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="پسورد"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="save-btn" type="submit">
          ورود
        </button>

        {/* 👇 دکمه بازگشت به خانه */}
        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          بازگشت به صفحه اصلی
        </button>
      </form>
    </div>
  );
}
