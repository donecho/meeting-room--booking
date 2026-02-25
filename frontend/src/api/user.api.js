import { api } from "./axios";

export const fetchUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);