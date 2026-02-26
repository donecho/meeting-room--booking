import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import { usePermission } from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { hasPermission } = usePermission();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">Meeting Room</h1>

          <nav className="flex flex-col gap-3">
            {/* Bookings */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-200"
                }`
              }
            >
              Bookings
            </NavLink>

            {user?.role === "owner" && (
              <NavLink
                to="/grouped"
                className={({ isActive }) =>
                  `px-3 py-2 rounded ${
                    isActive ? "bg-black text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                Grouped Bookings
              </NavLink>
            )}

            {/* Users (Permission Based) */}
            {hasPermission(PERMISSIONS.MANAGE_USERS) && (
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `px-3 py-2 rounded ${
                    isActive ? "bg-black text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                Users
              </NavLink>
            )}

            {/* Summary (Role Based) */}
            {user?.role === "owner" && (
              <NavLink
                to="/summary"
                className={({ isActive }) =>
                  `px-3 py-2 rounded ${
                    isActive ? "bg-black text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                Summary
              </NavLink>
            )}
          </nav>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t pt-4">
          <div className="mb-3">
            <p className="text-sm font-medium">{user?.email}</p>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {user?.role}
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}