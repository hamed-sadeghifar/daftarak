import MainLayout from "../layouts/MainLayout";
import NoteCard from "../components/notes/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

import styles from "./styles/Home.module.css";

const Home = () => {
  const { filteredNotes } = useContext(NoteContext);
  return (
    <MainLayout>
      <section className={styles.hero}>
        <h1>سلام 👋</h1>

        <p>امروز می‌خوای چی ثبت کنی؟</p>
      </section>

      <section className={styles.notesGrid}>
        {filteredNotes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </section>
    </MainLayout>
  );
};

export default Home;
