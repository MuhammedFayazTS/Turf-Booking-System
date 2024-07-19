import Joi from "@hapi/joi";
import User from "../../models/user.model.js";
import Notification from "../../models/notification.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {
  sendAdminNotifications,
  sendNotification,
} from "../../utils/notification.helper.js";
import { TypeConstants } from "../../constants.js";
import { getPagination, uploadFile } from "../../utils/helper.js";
import bcrypt from "bcryptjs";
import { deleteFromCloudinary } from "../../services/cloudinary.js";

// list users
const list = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1, search = "", role = "" } = req.query;

  const searchQuery = {
    _id: { $ne: req.user._id },
    $and: [
      { role: { $ne: "admin" } },
      { role: { $regex: role, $options: "i" } },
    ],
    $or: [{ deleted: false }, { deleted: { $exists: false } }],
    username: { $regex: search, $options: "i" },
  };

  const totalCount = await User.countDocuments(searchQuery);

  const { limitNum, skip, pageNum } = getPagination(page, limit);

  const users = await User.find(searchQuery)
    .limit(limitNum)
    .skip(skip)
    .select("-password");

  if (!users || users.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, "No users found"));
  }

  const totalPages = Math.ceil(totalCount / limitNum);

  const response = {
    totalCount,
    totalPages,
    currentPage: pageNum,
    pageSize: limitNum,
    users,
  };

  res
    .status(200)
    .json(new ApiResponse(200, response, "Users listed successfully"));
});

// get user details
const getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Invalid user id");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details loaded successfully"));
});

// get logged in user details
const getLoggedInUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  if (!id) {
    throw new ApiError(400, "Invalid user id");
  }

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details loaded successfully"));
});

// change user to owner or admin role
const changeUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role, createdUserId } = req.body;
  if (!id) {
    throw new ApiError(400, "No user id provided");
  }

  const existedUser = await User.findById(req.params.id).select(
    "-password -refreshToken"
  );
  if (!existedUser) {
    throw new ApiError(404, "User does not exist");
  }

  if (!role) {
    throw new ApiError(400, "Role must be provided");
  }

  if (role === existedUser.role) {
    return res
      .status(200)
      .json(new ApiResponse(200, existedUser, "No changes were made"));
  }

  //   if role is from user to admin or owner role send approval notification to admin
  if (role.toLowerCase() === "admin" || role.toLowerCase() === "owner") {
    const notificationData = {
      title: `Role change request for ${req.user.username}`,
      message: `${req.user.username} request for changing role to "${role}"`,
      type: "info",
      data: {
        approveUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.URC}/${createdUserId}/approve/${role}`,
        rejectUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.URC}/${createdUserId}/reject/${role}`,
      },
    };

    //send the change request to admin
    sendAdminNotifications(
      notificationData.title,
      notificationData.message,
      notificationData.type,
      notificationData.data
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existedUser,
          "User role change request sent to admin"
        )
      );
  }

  existedUser.role = role;
  await existedUser.save();
  res
    .status(200)
    .json(new ApiResponse(200, existedUser, "User role updated successfully"));
});

// change user password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const id = req.user?._id;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Confirm password does not match");
  }

  const user = await User.findById(id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  const isPasswordMatch = await bcrypt.compare(newPassword, user.password);
  if (isPasswordMatch) {
    throw new ApiError(400, "New password must different from old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  sendNotification(
    id,
    "Password changed successfully",
    "Account password changed successfully",
    "info"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// UPDATE user details
const updateUserDetails = asyncHandler(async (req, res) => {
  const { email, username, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        username,
        email,
        phone,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

//update user image
const updateUserImage = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const files = req.files;

  if (!files || files.length === 0) {
    throw new ApiError(400, "Image file is missing");
  }
  const uploadedImage = await uploadFile(files, "image");

  if (!uploadedImage) {
    throw new ApiError(400, "Error while uploading image");
  }

  const oldImage = await User.findById(id).select("image");
  await deleteFromCloudinary(oldImage);

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { image: uploadedImage } },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User image updated successfully"));
});

// delete user
const destroy = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Check if the user exists and is not already deleted
  const user = await User.findOne({ _id: id, deleted: false });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User not found or already deleted"));
  }

  // Perform the soft delete
  const deleted = await User.delete({ _id: id });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, deleted, "User deleted successfully"));
});

const getUnseenNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id });
  if (!notifications) {
    return res.status(404, new ApiResponse(404, [], "No unseen notifications"));
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, { notifications }, "Unseen notifications are listed")
    );
});

export {
  changeUserRole,
  list,
  getOne,
  getLoggedInUser,
  changeUserPassword,
  updateUserDetails,
  updateUserImage,
  destroy,
  getUnseenNotifications
};
