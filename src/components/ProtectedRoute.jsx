import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // Not logged in

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role

  if (role && user.role !== role) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/user" replace />;
  }

  return children;
}
