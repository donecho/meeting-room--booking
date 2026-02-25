import User from "../models/User.js";

export const createUserRepo = (data) => User.create(data);

export const getAllUsersRepo = () => User.find();

export const findUserByIdRepo = (id) => User.findById(id);

export const deleteUserRepo = (id) =>
  User.findByIdAndDelete(id);

export const updateUserRoleRepo = (id, role) =>
  User.findByIdAndUpdate(id, { role }, { new: true });

export const findUserByEmailRepo = (email) =>
  User.findOne({ email }).select("+password");