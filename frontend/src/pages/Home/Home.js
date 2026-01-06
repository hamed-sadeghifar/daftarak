import "./Home.css";
import About from "../../components/About/About";
import Skills from "../../components/Skills/Skills";
import Projects from "../../components/Projects/Projects";
import Blog from "../../components/Blog/Blog";
import Contact from "../../components/Contact/Contact";
import Sidebare from "../../components/Sidebar/Sidebare";
import AdminIcon from "../../components/Admin/AdminIcon/AdminIcon";

export default function Home() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="main-content">
          <About />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
          <AdminIcon />
        </div>
        <Sidebare />
      </div>
    </div>
  );
}
