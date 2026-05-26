import MainLayout from "../layouts/MainLayout";
import styles from "./styles/NoteDetails.module.css";

import { useParams } from "react-router-dom";

import { useContext } from "react";

import { NoteContext } from "../context/NoteContext";

import { Link } from "react-router-dom";

import { MdOutlineEdit } from "react-icons/md";

import { HiOutlineTrash } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

const categoryMap = {
  personal: "شخصی",
  work: "کاری",
  study: "مطالعه",
  ideas: "ایده‌ها",
};

const NoteDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { notes, deleteNote } = useContext(NoteContext);

  const note = notes.find((note) => note.id === id);

  const deleteHandler = () => {
    deleteNote(note.id);
    navigate("/");
  };

  if (!note) {
    return <MainLayout>یادداشت پیدا نشد</MainLayout>;
  }

  return (
    <MainLayout>
      <section className={styles.page}>
        <article
          className={styles.note}
          style={{
            background: note.color,
          }}
        >
          <div className={styles.top}>
            <span>{categoryMap[note.category]}</span>

            <div className={styles.actions}>
              <Link to={`/edit-note/${note.id}`} className={styles.editBtn}>
                <MdOutlineEdit />
              </Link>

              <button className={styles.deleteBtn} onClick={deleteHandler}>
                <HiOutlineTrash />
              </button>
            </div>
          </div>

          <h1>{note.title}</h1>

          <p className={styles.date}>
            {new Date(note.createdAt).toLocaleDateString("fa-IR")}
          </p>

          <div className={styles.text}>{note.text}</div>
        </article>
      </section>
    </MainLayout>
  );
};

export default NoteDetails;
