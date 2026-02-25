import { PERMISSIONS } from "../constants/permissions.js";

/* =========================
   ROLE BASED AUTH
========================= */

export const authorize = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden - insufficient role",
      });
    }

    next();
  };
};


/* =========================
   PERMISSION BASED AUTH
========================= */

export const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const allowedRoles = PERMISSIONS[permissionKey];

    if (!allowedRoles) {
      return res.status(500).json({ message: "Permission not defined" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};