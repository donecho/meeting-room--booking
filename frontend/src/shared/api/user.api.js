import api from "@/shared/api/api";

/* =========================
   GET USERS
========================= */
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data.data;

};

/* =========================
   CREATE USER
========================= */
export const createUser = (data) => {
  return api.post("/users", data);
};

/* =========================
   UPDATE USER ROLE
========================= */
export const updateUserRole = async (id, role) => {
  return api.patch(`/users/${id}/role`, { role });
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};