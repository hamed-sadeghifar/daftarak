// AdminPanel.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import "./AdminPanel.css";
import { isAdminLoggedIn } from "../../utils/adminAuth";

import AboutAdmin from "../../components/Admin/AboutAdmin/AboutAdmin";
import SkillsAdmin from "../../components/Admin/SkillsAdmin/SkillsAdmin";
import ProjectsAdmin from "../../components/Admin/ProjectsAdmin/ProjectsAdmin";
import BlogAdmin from "../../components/Admin/BlogAdmin/BlogAdmin";
import ContactAdmin from "../../components/Admin/ContactAdmin/ContactAdmin";
import SidebarAdmin from "../../components/Admin/SidebarAdmin/SidebarAdmin";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/varede-panel-sho");
    }
  }, [navigate]);

  // تعیین اینکه کدام بخش فعال باشد
  const [activeSection, setActiveSection] = useState("about");

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutAdmin />;
      case "skills":
        return <SkillsAdmin />;
      case "projects":
        return <ProjectsAdmin />;
      case "blog":
        return <BlogAdmin />;
      case "contact":
        return <ContactAdmin />;
      case "sidebar":
        return <SidebarAdmin />;
      default:
        return <AboutAdmin />;
    }
  };

  function handleLogout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/varede-panel-sho";
  }

  return (
    <div className="admin-wrapper">
      {/* منوی بخش‌ها */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>پنل مدیریت</h2>
          <button onClick={handleLogout} className="logout-btn" title="خروج">
            <IoLogOutOutline />
          </button>
          <button
            className="home-icon-btn"
            onClick={() => navigate("/")}
            title="بازگشت به سایت"
          >
            <FaHome />
          </button>
        </div>
        <ul>
          <li
            className={activeSection === "about" ? "active" : ""}
            onClick={() => setActiveSection("about")}
          >
            درباره من
          </li>

          <li
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => setActiveSection("skills")}
          >
            مهارت‌ها
          </li>

          <li
            className={activeSection === "projects" ? "active" : ""}
            onClick={() => setActiveSection("projects")}
          >
            پروژه‌ها
          </li>

          <li
            className={activeSection === "blog" ? "active" : ""}
            onClick={() => setActiveSection("blog")}
          >
            وبلاگ
          </li>

          <li
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => setActiveSection("contact")}
          >
            تماس
          </li>

          <li
            className={activeSection === "sidebar" ? "active" : ""}
            onClick={() => setActiveSection("sidebar")}
          >
            سایدبار
          </li>
        </ul>
      </div>

      {/* محتوای بخش */}
      <div className="admin-content">{renderSection()}</div>
    </div>
  );
};

export default AdminPanel;
