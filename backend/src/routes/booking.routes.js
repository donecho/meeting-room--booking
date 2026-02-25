import express from "express";

import {
  // Booking CRUD
  createBooking,
  getBookings,
  deleteBooking,

  // Owner/Admin Summary
  getGroupedBookings,
  getBookingSummary

} from "../controllers/booking.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize, checkPermission } from "../middleware/permission.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();


/* =========================
   ALL ROUTES REQUIRE LOGIN
========================= */
router.use(protect);


/* =========================
   BOOKING CRUD (USER / ADMIN / OWNER)
========================= */

// Create booking
router.post(
  "/",
  checkPermission("CREATE_BOOKING"),
  createBooking
);

// Get bookings (role-based logic inside service)
router.get("/", getBookings);

// Delete booking (requires permission)
router.delete(
  "/:id",
  checkPermission("DELETE_BOOKING"),
  deleteBooking
);


/* =========================
   OWNER / ADMIN ONLY
========================= */

// Grouped by user
router.get(
  "/grouped",
  authorize([ROLES.OWNER, ROLES.ADMIN]),
  getGroupedBookings
);

// Booking summary
router.get(
  "/summary",
  authorize([ROLES.OWNER, ROLES.ADMIN]),
  getBookingSummary
);


export default router;