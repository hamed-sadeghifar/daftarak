import styles from "./NoteCard.module.css";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineBookmark,
} from "react-icons/hi";

import { useContext } from "react";

import { NoteContext } from "../../context/NoteContext";

import { Link } from "react-router-dom";

const categoryMap = {
  personal: "شخصی",
  work: "کاری",
  study: "مطالعه",
  ideas: "ایده‌ها",
};

const NoteCard = ({ note }) => {
  const { editNote, deleteNote } = useContext(NoteContext);

  const updatedNote = {
    ...note,

    isPinned: !note.isPinned,

    updatedAt: Date.now(),
  };

  return (
    <article
      className={styles.card}
      style={{
        background: note.color,
      }}
    >
      <div className={styles.cardTop}>
        <button
          className={styles.pinBtn}
          onClick={() => {
            editNote(note.id, updatedNote);
          }}
        >
          <HiOutlineBookmark
            className={`${styles.bookmarkSvg} ${note.isPinned ? styles["active-pin"] : ""}`}
          />
        </button>
        <span className={styles.category}>{categoryMap[note.category]}</span>
      </div>

      <Link to={`/detailes-note/${note.id}`} className={styles.content}>
        <h3>{note.title}</h3>

        <p>{note.text}</p>
      </Link>

      <div className={styles.footer}>
        <span>
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString(
            "fa-IR",
          )}
        </span>

        <div className={styles.actions}>
          <Link to={`/edit-note/${note.id}`} className={styles.actionBtn}>
            <button>
              <HiOutlinePencil />
            </button>
          </Link>

          <button
            className={styles.actionBtn}
            onClick={() => deleteNote(note.id)}
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
