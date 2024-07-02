import mongoose from "mongoose";
import ejs from "ejs";
import Joi from "@hapi/joi";
import nodemailer from "nodemailer";
import path from "path";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

// user schema for validation
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(8).max(15).required(),
  username: Joi.string().min(4).max(12).required(),
});

//validation middleware function
export const signUpValidate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  next();
};

const signup = asyncHandler(async (req, res) => {
  const { email, password, phone, username } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }, { username }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      (message = "User with email or username or phone number already exists")
    );
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    phone,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while sign up user");
  }

  // TODO: Account activation through mail if role is owner

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User signed up successfully. Account verification email has been sent to your email address."
      )
    );
});

export { signup };
