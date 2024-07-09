import Joi from "@hapi/joi";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { sendAdminNotifications } from "../../utils/notification.helper.js";
import { TypeConstants } from "../../constants.js";
import { getPagination } from "../../utils/helper.js";

// list users
const list = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1, search = "" } = req.query;

  const searchQuery = {
    _id: { $ne: req.user._id },
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
    throw new ApiError(400, "Invalid user id", "Invalid user id");
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
    throw new ApiError(400, "Invalid user id", "Invalid user id");
  }

  const user = await User.findById(id).select("-password");

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

export { changeUserRole, list, getOne,getLoggedInUser };
