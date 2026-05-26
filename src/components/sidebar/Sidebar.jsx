import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlineBookmark,
} from "react-icons/hi";
import { NoteContext } from "../../context/NoteContext";
const Sidebar = () => {
  const { setSelectedCategory, selectedCategory } = useContext(NoteContext);
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.menu}>
        <Link
          to="/"
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? styles.active : ""}
        >
          <HiOutlineHome />
          <span>همه یادداشت‌ها</span>
        </Link>

        <Link
          to="/"
          className={selectedCategory === "ideas" ? styles.active : ""}
          onClick={() => setSelectedCategory("ideas")}
        >
          <HiOutlineLightBulb />
          <span>ایده‌ها</span>
        </Link>

        <Link
          to="/"
          className={selectedCategory === "pinned" ? styles.active : ""}
          onClick={() => setSelectedCategory("pinned")}
        >
          <HiOutlineBookmark />
          <span>پین شده‌ها</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
