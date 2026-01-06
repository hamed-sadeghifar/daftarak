import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/adminAuth";

export default function ProtectedRoute({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/panel-h730903s" replace />;
  }

  return children;
}