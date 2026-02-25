import { useEffect, useState } from "react";
import { fetchUsers, createUser } from "../../api/user.api";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load Users
  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  // 🔹 Create User
  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);
      await createUser({ name: name.trim() });
      setName("");
      await loadUsers(); // reload after create
    } catch (err) {
      console.error("Failed to create user:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial Load
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6 text-white space-y-6">
      <h2 className="text-2xl font-bold">Users</h2>

      {/* Create Section */}
      <div className="flex gap-2">
        <input
          className="px-3 py-2 bg-slate-700 rounded"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-emerald-600 rounded disabled:opacity-50"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {users.length === 0 ? (
          <div className="text-gray-400">No users found.</div>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              className="bg-slate-800 p-3 rounded flex justify-between"
            >
              <span>{u.name}</span>
              <span className="text-sm text-gray-400">
                {u.role}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}