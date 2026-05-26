import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const { searchValue, setSearchValue } = useContext(NoteContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <span>📒</span>
          <h2>دفترک</h2>
        </div>

        <div className={styles.searchBox}>
          <FiSearch />

          <input
            type="text"
            placeholder="جستجو در یادداشت‌ها..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
          </button>
          <Link to="/create-note">
            <button className={styles.addBtn}>
              <IoAdd />
              <span>یادداشت جدید</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
