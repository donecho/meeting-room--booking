import express from "express";
import { loginUser } from "../controllers/user.controller.js";

const router = express.Router();

// Login
router.post("/login", loginUser);

export default router;