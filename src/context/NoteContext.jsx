import { createContext, useEffect, useState } from "react";
export const NoteContext = createContext(null);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const sevedNotes = localStorage.getItem("notes");
    return sevedNotes ? JSON.parse(sevedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const editNote = (noteId, updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? updatedNote : note)),
    );
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchValue, setSearchValue] = useState("");

  const filteredNotes = notes.filter((note) => {
    const categoryMatch =
      selectedCategory === "all"
        ? true
        : selectedCategory === "pinned"
          ? note.isPinned
          : note.category === selectedCategory;

    const searchMatch =
      note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.text.toLowerCase().includes(searchValue.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <NoteContext.Provider
      value={{
        notes,
        filteredNotes,

        selectedCategory,
        setSelectedCategory,

        searchValue,
        setSearchValue,

        addNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
export default NotesProvider;
