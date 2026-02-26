import { useEffect, useState, useCallback } from "react";
import api from "@/shared/api/api";
import UserTable from "./UserTable";
import CreateUserModal from "./CreateUserModal";
import { usePermission } from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { hasPermission } = usePermission();

  /* =========================
     FETCH USERS
  ========================= */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/users");
      setUsers(res.data.data || []);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>

        {hasPermission(PERMISSIONS.MANAGE_USERS) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserTable users={users} refresh={fetchUsers} />
      )}

      {/* Create User Modal */}
      {open && (
        <CreateUserModal
          onClose={() => setOpen(false)}
          refetch={fetchUsers}
        />
      )}
    </div>
  );
}