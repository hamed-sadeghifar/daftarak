import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetails from "./pages/NoteDetails";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/detailes-note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
};

export default App;
