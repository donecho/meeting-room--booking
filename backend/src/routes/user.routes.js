import express from "express";
import * as controller from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";

const router = express.Router();

/* =========================
   AUTH
========================= */

router.post("/login", controller.loginUser);

/* =========================
   USER MANAGEMENT (ADMIN)
========================= */

router.post(
  "/",
  protect,
  checkPermission("MANAGE_USERS"),
  controller.createUser
);

router.get(
  "/",
  protect,
  checkPermission("MANAGE_USERS"),
  controller.getUsers
);

router.get(
  "/:id",
  protect,
  checkPermission("MANAGE_USERS"),
  controller.getUser
);

router.patch(
  "/:id/role",
  protect,
  checkPermission("MANAGE_USERS"),
  controller.updateRole
);

router.delete(
  "/:id",
  protect,
  checkPermission("MANAGE_USERS"),
  controller.deleteUser
);

export default router;