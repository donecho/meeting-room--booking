import asyncHandler from "../utils/asyncHandler.js";
import * as service from "../services/user.service.js";

/* =========================
   CREATE USER
========================= */

export const createUser = asyncHandler(async (req, res) => {
  const user = await service.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

/* =========================
   GET ALL USERS
========================= */

export const getUsers = asyncHandler(async (req, res) => {
  const users = await service.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

/* =========================
   GET SINGLE USER
========================= */

export const getUser = asyncHandler(async (req, res) => {
  const user = await service.getUser(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/* =========================
   DELETE USER
========================= */

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await service.deleteUser(
    req.params.id,
    req.user.id   // protect self delete
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

/* =========================
   UPDATE USER ROLE
========================= */

export const updateRole = asyncHandler(async (req, res) => {
  const user = await service.changeUserRole(
    req.params.id,
    req.body.role,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: user,
  });
});

/* =========================
   LOGIN
========================= */

export const loginUser = asyncHandler(async (req, res) => {
  const result = await service.loginUserService(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});