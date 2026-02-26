import { PERMISSIONS } from "../constants/permissions";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions";

export const canDeleteBooking = (user, booking) => {
  if (!user || !booking) return false;

  const permissions = ROLE_PERMISSIONS[user.role] || [];

  // Admin-level permission
  if (permissions.includes(PERMISSIONS.DELETE_BOOKING)) {
    return true;
  }

  // Normal user: only own booking
  return String(booking.userId) === String(user._id);
};