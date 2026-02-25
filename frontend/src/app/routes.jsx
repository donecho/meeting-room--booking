import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import BookingPage from "../features/bookings/BookingPage";
import UserPage from "../features/users/UserPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "OWNER", "USER"]}>
            <BookingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}