import * as repo from "../repositories/user.repository.js";
import * as bookingRepo from "../repositories/booking.repository.js";
import { generateToken } from "../utils/jwt.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

/* =========================
   CREATE USER (ADMIN)
========================= */

export const createUser = async (data) => {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  if (role && !Object.values(ROLES).includes(role)) {
    throw new AppError("Invalid role provided", 400);
  }

  const existing = await repo.findUserByEmailRepo(email);
  if (existing) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return repo.createUserRepo({
    name,
    email,
    password: hashedPassword,
    role: role || ROLES.USER,
  });
};

/* =========================
   GET USERS
========================= */

export const getUsers = async () => {
  return repo.getAllUsersRepo();
};

export const getUser = async (id) => {
  const user = await repo.findUserByIdRepo(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/* =========================
   DELETE USER (PREVENT IF BOOKINGS EXIST)
========================= */

export const deleteUser = async (id) => {
  const user = await repo.findUserByIdRepo(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Check if user has bookings
  const existingBooking = await bookingRepo.findBookingByUserRepo(id);

  if (existingBooking) {
    throw new AppError(
      "Cannot delete user with existing bookings. Delete bookings first.",
      400
    );
  }

  await repo.deleteUserRepo(id);

  return { message: "User deleted successfully" };
};

/* =========================
   CHANGE ROLE (ADMIN)
========================= */

export const changeUserRole = async (id, role) => {
  if (!Object.values(ROLES).includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const user = await repo.updateUserRoleRepo(id, role);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

/* =========================
   LOGIN
========================= */

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  const user = await repo.findUserByEmailRepo(email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  };
};