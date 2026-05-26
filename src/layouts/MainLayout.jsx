import styles from "./MainLayout.module.css";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.app}>
        <Sidebar />

        <div className={styles.main}>
          <Header />

          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
