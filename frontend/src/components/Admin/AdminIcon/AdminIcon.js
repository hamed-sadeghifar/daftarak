import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAdminLoggedIn } from "../../../utils/adminAuth"; // مسیرش رو درست کن
import "./AdminIcon.css";

const AdminIcon = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn());

    // اگر توکن در تب‌های دیگه پاک شد
    const onStorageChange = () => {
      setIsLoggedIn(isAdminLoggedIn());
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div
      className="admin-icon"
      onClick={() => navigate("/varede-panel-shodam")}
      title="پنل مدیریت"
    >
      ⚙️
    </div>
  );
};

export default AdminIcon;