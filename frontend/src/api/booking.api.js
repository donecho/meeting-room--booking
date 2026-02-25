import { api } from "./axios";

export const getBookings = (userId) => {
  return api.get("/bookings", {
    headers: { "x-user-id": userId }
  });
};

export const createBooking = (data, userId) => {
  return api.post("/bookings", data, {
    headers: { "x-user-id": userId }
  });
};

export const deleteBooking = (id, userId) => {
  return api.delete(`/bookings/${id}`, {
    headers: { "x-user-id": userId }
  });
};