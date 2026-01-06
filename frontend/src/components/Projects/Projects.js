import { useEffect, useState } from "react";
import "./Projects.css";

export default function Projects() {
  const [modalProject, setModalProject] = useState(null);
  const API_URL = "http://localhost:5000/api/projects";
  const [projects, setProjects] = useState([]);

  /* ======================
       GET projects
    ====================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const openModal = (project) => {
    setModalProject(project);
  };
  const closeModal = () => {
    setModalProject(null);
  };

  return (
    <>
      {modalProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <iframe
              src={modalProject.demo}
              title={modalProject.title}
              className="modal-iframe"
            />
          </div>
        </div>
      )}
      <section id="projects">
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p._id}>
              <img
                src={
                  p.img?.startsWith("http")
                    ? p.img
                    : `http://localhost:5000${p.img}`
                }
                alt={p.title}
                className="project-img"
              />
              <div className="project-hover">
                <h3>{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="tech-stack">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <button className="open-modal-btn" onClick={() => openModal(p)}>
                  مشاهده پروژه
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
