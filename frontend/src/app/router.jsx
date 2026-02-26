import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/features/auth/auth.context";
import LoginPage from "@/features/auth/LoginPage";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import DashboardLayout from "@/shared/components/DashboardLayout";
import BookingsPage from "@/features/bookings/BookingsPage";
import UsersPage from "@/features/users/UsersPage";
import SummaryPage from "@/features/summary/SummaryPage";
import { PERMISSIONS } from "@/shared/constants/permissions";
import GroupedBookingsPage from "@/features/bookings/GroupBookingsPage";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <BookingsPage /> },
           {
            path: "grouped", 
            element: (
              <ProtectedRoute>
                <GroupedBookingsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute permission={PERMISSIONS.MANAGE_USERS}>
                <UsersPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "summary",
            element: (
              <ProtectedRoute permission={PERMISSIONS.VIEW_SUMMARY}>
                <SummaryPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);