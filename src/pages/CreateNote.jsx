import MainLayout from "../layouts/MainLayout";
import styles from "./styles/CreateNote.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../context/NoteContext";

const CreateNote = () => {
  const { addNote } = useContext(NoteContext);
  const navigate = useNavigate();
  const [noteColor, setNoteColor] = useState("var(--color-1)");
  const [isPinned, setIsPinned] = useState(false);
  const submitNoteHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value || event.target[1].value) {
      const newNote = {
        id: crypto.randomUUID(),
        title: event.target[0].value,
        text: event.target[1].value,
        category: event.target[2].value,
        color: noteColor,
        isPinned: isPinned,
        createdAt: new Date(),
        updatedAt: "",
      };
      addNote(newNote);
    }
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "personal";
    setNoteColor("var(--color-1)");
    setIsPinned(false);
    navigate("/");
  };
  return (
    <MainLayout>
      <section className={styles.page}>
        <div className={styles.top}>
          <div>
            <h1>یادداشت جدید</h1>

            <p>ایده‌ها و نوشته‌هات رو ثبت کن.</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={submitNoteHandler}>
          <div className={styles.group}>
            <label>عنوان یادداشت</label>

            <input type="text" placeholder="مثلا ایده برای پروژه جدید..." />
          </div>

          <div className={styles.group}>
            <label>متن یادداشت</label>

            <textarea placeholder="شروع به نوشتن کن..." />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>دسته‌بندی</label>

              <select>
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
                  className={`${styles.color1} ${noteColor === "var(--color-1)" ? styles["active-border"] : ""}`}
                  onClick={() => {
                    setNoteColor("var(--color-1)");
                  }}
                />

                <button
                  type="button"
                  className={`${styles.color2} ${noteColor === "var(--color-2)" ? styles["active-border"] : ""}`}
                  onClick={() => {
                    setNoteColor("var(--color-2)");
                  }}
                />

                <button
                  type="button"
                  className={`${styles.color3} ${noteColor === "var(--color-3)" ? styles["active-border"] : ""}`}
                  onClick={() => {
                    setNoteColor("var(--color-3)");
                  }}
                />

                <button
                  type="button"
                  className={`${styles.color4} ${noteColor === "var(--color-4)" ? styles["active-border"] : ""}`}
                  onClick={() => {
                    setNoteColor("var(--color-4)");
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <button
              type="button"
              className={styles.pinBtn}
              onClick={() => {
                setIsPinned(!isPinned);
              }}
            >
              <HiOutlineBookmark
                className={`${isPinned ? styles["active-pin"] : ""}`}
              />

              <span>سنجاق کردن یادداشت</span>
            </button>

            <div className={styles.actions}>
              <Link to="/">
                <button type="button" className={styles.cancelBtn}>
                  انصراف
                </button>
              </Link>

              <button type="submit" className={styles.saveBtn}>
                ذخیره یادداشت
              </button>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default CreateNote;
