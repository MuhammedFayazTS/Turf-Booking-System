import Joi from "@hapi/joi";
import nodemailer from "nodemailer";
import path from "path";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { getTokenExpiry, uploadFile } from "../../utils/helper.js";

// user schema for validation
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).optional().messages({
    "any.only": "Confirm password must match password",
    "string.empty": "Confirm password is required",
  }),
  phone: Joi.string().min(8).max(15).required(),
  username: Joi.string().min(3).max(12).required(),
  role: Joi.string().optional(),
  image: Joi.optional(),
});

const schemaForSignIn = schema.fork(
  ["email", "phone", "username", "role"],
  (field) => field.optional()
);

//validation middleware function
export const signUpValidate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(new ApiError(400, "All fields are required", error.message));
  }

  next();
};
export const signInValidate = (req, res, next) => {
  const { error } = schemaForSignIn.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(new ApiError(400, "All fields are required", error.message));
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
  const { email, password, phone, username, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email }, { username }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with email or username or phone number already exists"
    );
  }

  if (role === "admin") {
    throw new ApiError(403, "Only admin can assign admin role to users");
  }

  const imageFile = req.files[0]?.fieldname;
  let uploadedImage;
  if (imageFile) {
    const files = req.files;
    uploadedImage = await uploadFile(files, "image");
  }

  if (imageFile && !uploadedImage) {
    throw new ApiError(500, "Error in uploading file");
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    phone,
    role,
    image: uploadedImage,
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
    .json(new ApiResponse(201, createdUser, "User signed up successfully."));
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password, phone, username } = req.body;

  const user = await User.findOne({
    $and: [
      {
        $or: [{ deleted: false }, { deleted: { $exists: false } }],
      },
      {
        $or: [{ email }, { phone }, { username }],
      },
    ],
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

  const tokenExpiresAt = getTokenExpiry(accessToken);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        tokenExpiresAt,
        // Uncomment below lines if you want to send tokens in the response body for mobile apps or local storage
        // accessToken,
        // refreshToken,
      },
      "User signed in successfully"
    )
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const { accessToken, newRefreshToken: refreshToken } =
      await generateAccessAndRefreshToken(user._id);

    const tokenExpiresAt = getTokenExpiry(accessToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { tokenExpiresAt }, "Access Token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { signUp, signIn, signOut, refreshAccessToken };
