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

const schemaForSignIn = schema.fork(["email", "phone", "username"], (field) =>
  field.optional()
);

//validation middleware function
export const signUpValidate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  next();
};
export const signInValidate = (req, res, next) => {
  const { error } = schemaForSignIn.validate(req.body);

  if (error) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  next();
};

//generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const signUp = asyncHandler(async (req, res) => {
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

const signIn = asyncHandler(async (req, res) => {
  const { email, password, phone, username } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { phone }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .lean();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return res.status(200).json(
    new ApiResponse(200, {
      user: loggedInUser,
      // Uncomment below lines if you want to send tokens in the response body for mobile apps or local storage
      // accessToken,
      // refreshToken,
    })
  );
});

const signOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Signed Out"));
});

export { signUp, signIn, signOut };
