import { useState } from "react";
import { ROLES } from "@/shared/constants/roles";
import { useAuth } from "@/features/auth/auth.context";
import {
  deleteUser,
  updateUserRole,
} from "@/shared/api/user.api";

export default function UserTable({ users = [], refresh }) {
  const { user: currentUser } = useAuth();
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This user's bookings may also be deleted."
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);
      await deleteUser(id);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      setLoadingId(id);
      await updateUserRole(id, newRole);
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Role update failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (!Array.isArray(users)) {
    return (
      <p className="text-red-500 font-medium">
        Invalid users data
      </p>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="p-6 text-center text-gray-500"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">
                  {u.name}
                </td>

                <td className="p-3 text-gray-600">
                  {u.email}
                </td>

                <td className="p-3">
                  <select
                    value={u.role}
                    disabled={
                      u._id === currentUser?._id ||
                      loadingId === u._id
                    }
                    onChange={(e) =>
                      handleRoleChange(
                        u._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Object.values(ROLES).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3">
                  {u._id !== currentUser?._id && (
                    <button
                      onClick={() =>
                        handleDelete(u._id)
                      }
                      disabled={
                        loadingId === u._id
                      }
                      className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                    >
                      {loadingId === u._id
                        ? "Processing..."
                        : "Delete"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}