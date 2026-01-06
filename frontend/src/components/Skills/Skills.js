import "./Skills.css";
import { useEffect, useState } from "react";

export default function Skills() {
  const API_URL = "http://localhost:5000/api/skills";
  const [skills, setSkills] = useState([]);

  /* =====================
       GET skills
    ===================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  const technicalSkills = skills.filter((s) => s.type === "technical");
  const softSkills = skills.filter((s) => s.type === "soft");

  return (
    <>
      <section id="skills">
        <h3>مهارت‌های فنی</h3>

        {/* مهارت‌های فنی */}
        <div className="skills-grid" id="technical-skills">
          {technicalSkills.map((skill) => (
            <a
              key={skill._id}
              href={skill.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-card"
            >
              <img
                src={
                  skill.logo.startsWith("http")
                    ? skill.logo
                    : `http://localhost:5000${skill.logo}`
                }
                alt={skill.name}
                className="skill-logo"
              />
              <span>{skill.name}</span>
            </a>
          ))}
        </div>

        {/* مهارت‌های نرم */}
        <div className="soft-skills">
          <h3>مهارت‌های نرم</h3>
          <div id="soft-skills">
            <ul>
              {softSkills.map((skill) => (
                <li key={skill._id} className="soft-skill">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
