import { ROLES } from "./roles.js";

export const PERMISSIONS = Object.freeze({
  CREATE_BOOKING: [ROLES.USER, ROLES.OWNER],

  VIEW_BOOKING: [
    ROLES.USER,
    ROLES.OWNER,
    ROLES.ADMIN,
  ],

  DELETE_BOOKING: [
    ROLES.USER,   // ownership enforced in service
    ROLES.OWNER,
    ROLES.ADMIN,
  ],

  MANAGE_USERS: [ROLES.ADMIN],

  VIEW_USERS: [ROLES.ADMIN],

  VIEW_SUMMARY: [
    ROLES.OWNER,
    ROLES.ADMIN,
  ],
});