import asyncHandler from "../utils/asyncHandler.js";

import {
  createBookingService,
  getBookingsService,
  deleteBookingService,
  getGroupedBookingsService,
  getBookingSummaryService
} from "../services/booking.service.js";


/* =========================
   BOOKING CRUD
========================= */

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body, req.user);

  res.status(201).json({
    success: true,
    data: booking
  });
});


// Get Bookings (Role Based)
export const getBookings = asyncHandler(async (req, res) => {
  const bookings = await getBookingsService(req.user);

  res.status(200).json({
    success: true,
    data: bookings
  });
});


// Delete Booking
export const deleteBooking = asyncHandler(async (req, res) => {
  await deleteBookingService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully"
  });
});


/* =========================
   OWNER / ADMIN SUMMARY
========================= */

// Grouped Bookings by User
export const getGroupedBookings = asyncHandler(async (req, res) => {
  const data = await getGroupedBookingsService();

  res.status(200).json({
    success: true,
    data
  });
});


// Booking Summary
export const getBookingSummary = asyncHandler(async (req, res) => {
  const data = await getBookingSummaryService();

  res.status(200).json({
    success: true,
    data
  });
});