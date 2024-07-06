import Joi from "@hapi/joi";
import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { sendAdminNotifications } from "../../utils/notification.helper.js";
import { TypeConstants } from "../../constants.js";

// change user to owner or admin role
export const changeUserRole = asyncHandler(async (req, res) => {
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
        approveUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.USER_ROLE_CHANGE}/${createdUserId}/approve/${role}`,
        rejectUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.USER_ROLE_CHANGE}/${createdUserId}/reject/${role}`,
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
