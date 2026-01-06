import { useEffect, useState } from "react";
import {
  FaTelegramPlane,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "./Sidebare.css";

const API_URL = "http://localhost:5000/api/sidebar";

export default function Sidebare() {
  const [activeSection, setActiveSection] = useState("home");
  const [data, setData] = useState(null);

  /* =====================
     GET sidebar data
  ===================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setData);
  }, []);

  /* =====================
     ScrollSpy
  ===================== */
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0px -50% 0px" }
    );

    setTimeout(() => {
      sections.forEach((section) => observer.observe(section));
    }, 300);

    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{data.name}</h2>
        <h3>{data.title}</h3>
        <p>{data.bio}</p>
      </div>

      <ul className="sidebar-links">
        {["about", "skills", "projects", "blog", "contact"].map((id) => (
          <li key={id}>
            <a href={`#${id}`} className={activeSection === id ? "active" : ""}>
              {
                {
                  about: "درباره من",
                  skills: "مهارت‌ها",
                  projects: "پروژه‌ها",
                  blog: "وبلاگ",
                  contact: "تماس",
                }[id]
              }
            </a>
          </li>
        ))}
      </ul>

      <div className="sidebar-contact">
        {data.telegram && (
          <a href={data.telegram}>
            <FaTelegramPlane />
          </a>
        )}
        {data.instagram && (
          <a href={data.instagram}>
            <FaInstagram />
          </a>
        )}
        {data.linkedin && (
          <a href={data.linkedin}>
            <FaLinkedin />
          </a>
        )}
        {data.github && (
          <a href={data.github}>
            <FaGithub />
          </a>
        )}
        {data.email && (
          <a href={`mailto:${data.email}`}>
            <FaEnvelope />
          </a>
        )}
        {data.phone && (
          <a href={`tel:${data.phone}`}>
            <FaPhone />
          </a>
        )}
      </div>
    </div>
  );
}
