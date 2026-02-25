import * as repo from "../repositories/booking.repository.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/AppError.js";

/* =========================
   CREATE BOOKING
========================= */

export const createBookingService = async (body, user) => {
  const { startTime, endTime } = body;

  if (!startTime || !endTime) {
    throw new AppError("startTime and endTime are required", 400);
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new AppError("startTime must be before endTime", 400);
  }

  // Overlap check
  const overlapping = await repo.findOverlappingBooking(start, end);

  if (overlapping) {
    throw new AppError(
      "Booking time overlaps with existing booking",
      409
    );
  }

  return repo.createBookingRepo({
    userId: user._id,
    startTime: start,
    endTime: end
  });
};


/* =========================
   GET BOOKINGS
========================= */

export const getBookingsService = async (user) => {

  // ADMIN / OWNER → see all bookings
  if (
    user.role === ROLES.ADMIN ||
    user.role === ROLES.OWNER
  ) {
    return repo.getAllBookingsRepo();
  }

  // USER → see only own bookings
  if (user.role === ROLES.USER) {
    return repo.getBookingsByUserRepo(user._id);
  }

  throw new AppError("Not authorized", 403);
};


/* =========================
   DELETE BOOKING
========================= */

export const deleteBookingService = async (bookingId, user) => {
  const booking = await repo.findBookingByIdRepo(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // USER → can delete only own booking
  if (
    user.role === ROLES.USER &&
    booking.userId.toString() !== user._id.toString()
  ) {
    throw new AppError("Not authorized to delete this booking", 403);
  }

  return repo.deleteBookingRepo(bookingId);
};


/* =========================
   OWNER SUMMARY SERVICES
========================= */

export const getGroupedBookingsService = async () => {
  return repo.getBookingsGroupedByUser();
};

export const getBookingSummaryService = async () => {
  return repo.getBookingSummary();
};