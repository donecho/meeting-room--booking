import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../features/auth/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/bookings" replace />;
  }

  return children;
}