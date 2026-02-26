import api from "@/shared/api/api";

/* =========================
   GET BOOKINGS
========================= */
export const getBookings = async () => {
  const res = await api.get("/bookings");
  return res.data?.data || [];
};

/* =========================
   CREATE BOOKING
========================= */
export const createBooking = async (data) => {
  const res = await api.post("/bookings", data);
  return res.data?.data;
};

/* =========================
   DELETE BOOKING
========================= */
export const deleteBooking = async (id) => {
  const res = await api.delete(`/bookings/${id}`);
  return res.data?.data;
};

/* =========================
   GET GROUPED BOOKINGS
========================= */
export const getGroupedBookings = async () => {
  const res = await api.get("/bookings/grouped");
  return res.data?.data || [];
};

/* =========================
   GET BOOKING SUMMARY
========================= */
export const getBookingSummary = async () => {
  const res = await api.get("/bookings/summary");
  return res.data?.data || [];
};