import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import ApiResponse from "../config/api-response.js";
import ApiError from "../config/api-error.js";
import { validateSignupData } from "../config/validator.js";

const SALT = 10;

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return ApiResponse.ok(res, "Users fetched successfully", users);
  } catch (err) {
    return ApiResponse.error(res, ApiError.from(err));
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) throw ApiError.notFound("User not found");
    return ApiResponse.ok(res, "User fetched successfully", user);
  } catch (err) {
    return ApiResponse.error(res, ApiError.from(err));
  }
};

const createUser = async (req, res) => {
  try {
    validateSignupData(req);

    const { name, email, password, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    return ApiResponse.created(res, "User created successfully");
  } catch (err) {
    return ApiResponse.error(res, ApiError.from(err));
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (gender !== undefined) updates.gender = gender;
    if (password !== undefined) {
      updates.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) throw ApiError.notFound("User not found");
    return ApiResponse.ok(res, "User updated successfully", user);
  } catch (err) {
    return ApiResponse.error(res, ApiError.from(err));
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw ApiError.notFound("User not found");
    return ApiResponse.noContent(res);
  } catch (err) {
    return ApiResponse.error(res, ApiError.from(err));
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
