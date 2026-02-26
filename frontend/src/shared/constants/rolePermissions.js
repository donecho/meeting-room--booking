import { ROLES } from "./roles";
import { PERMISSIONS } from "./permissions";

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_SUMMARY,
    PERMISSIONS.DELETE_BOOKING,
  ],
  [ROLES.OWNER]: [
    PERMISSIONS.VIEW_SUMMARY,
  ],
  [ROLES.USER]: [],
};