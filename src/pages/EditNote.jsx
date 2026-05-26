import MainLayout from "../layouts/MainLayout";
import styles from "./styles/CreateNote.module.css";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import { useState } from "react";

import { Link } from "react-router-dom";

import { HiOutlineBookmark } from "react-icons/hi";

import { NoteContext } from "../context/NoteContext";

const EditNote = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { notes, editNote } = useContext(NoteContext);

  const note = notes.find((note) => note.id === id);

  const [title, setTitle] = useState(note?.title || "");

  const [text, setText] = useState(note?.text || "");

  const [category, setCategory] = useState(note?.category || "personal");

  const [noteColor, setNoteColor] = useState(note?.color || "var(--color-1)");

  const [isPinned, setIsPinned] = useState(note?.isPinned || false);

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedNote = {
      ...note,

      title,

      text,

      category,

      color: noteColor,

      isPinned,

      updatedAt: Date.now(),
    };

    editNote(id, updatedNote);

    navigate(`/detailes-note/${id}`);
  };

  if (!note) {
    return <MainLayout>یادداشت پیدا نشد</MainLayout>;
  }

  return (
    <MainLayout>
      <section className={styles.page}>
        <div className={styles.top}>
          <div>
            <h1>ویرایش یادداشت</h1>

            <p>تغییرات موردنظرت رو اعمال کن.</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.group}>
            <label>عنوان یادداشت</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <label>متن یادداشت</label>

            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>دسته‌بندی</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="personal">شخصی</option>

                <option value="work">کاری</option>

                <option value="study">مطالعه</option>

                <option value="ideas">ایده‌ها</option>
              </select>
            </div>

            <div className={styles.group}>
              <label>رنگ یادداشت</label>

              <div className={styles.colors}>
                <button
                  type="button"
                  className={`${styles.color1} ${
                    noteColor === "var(--color-1)"
                      ? styles["active-border"]
                      : ""
                  }`}
                  onClick={() => setNoteColor("var(--color-1)")}
                />

                <button
                  type="button"
                  className={`${styles.color2} ${
                    noteColor === "var(--color-2)"
                      ? styles["active-border"]
                      : ""
                  }`}
                  onClick={() => setNoteColor("var(--color-2)")}
                />

                <button
                  type="button"
                  className={`${styles.color3} ${
                    noteColor === "var(--color-3)"
                      ? styles["active-border"]
                      : ""
                  }`}
                  onClick={() => setNoteColor("var(--color-3)")}
                />

                <button
                  type="button"
                  className={`${styles.color4} ${
                    noteColor === "var(--color-4)"
                      ? styles["active-border"]
                      : ""
                  }`}
                  onClick={() => setNoteColor("var(--color-4)")}
                />
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <button
              type="button"
              className={styles.pinBtn}
              onClick={() => setIsPinned(!isPinned)}
            >
              <HiOutlineBookmark
                className={`${isPinned ? styles["active-pin"] : ""}`}
              />

              <span>سنجاق کردن یادداشت</span>
            </button>

            <div className={styles.actions}>
              <Link to={`/detailes-note/${id}`}>
                <button type="button" className={styles.cancelBtn}>
                  انصراف
                </button>
              </Link>

              <button type="submit" className={styles.saveBtn}>
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default EditNote;
