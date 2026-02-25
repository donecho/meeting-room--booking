import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import bookingRoutes from "./booking.routes.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "Backend Connected" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/bookings", bookingRoutes);

// Protected test route (JWT based)
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;