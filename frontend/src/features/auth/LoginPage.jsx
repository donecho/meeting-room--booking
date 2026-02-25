import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetchUsers } from "../../api/user.api";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));
  }, []);

  const handleLogin = async (selectedUser) => {
    const res = await api.get("/me", {
      headers: { "x-user-id": selectedUser._id }
    });

    login(res.data);
    if (res.data.role === "ADMIN") {
      navigate("/users");
    } else {
      navigate("/bookings");
    }
  };

  if (user) {
    return (
      <div className="p-6 text-white">
        Logged in as: {user.name} ({user.role})
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Select User</h2>
      {users.map((u) => (
        <button
          key={u._id}
          className="block mb-2 px-4 py-2 bg-emerald-600"
          onClick={() => handleLogin(u)}
        >
          {u.name} ({u.role})
        </button>
      ))}
    </div>
  );
}