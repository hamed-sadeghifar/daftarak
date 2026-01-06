import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import BlogPost from "./pages/BlogPost/BlogPost";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminLogin from "./pages/AdminLogin/adminLogin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/varede-panel-sho" element={<AdminLogin />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/varede-panel-shodam" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
