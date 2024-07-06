import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { sendNotification } from "../../utils/notification.helper.js";
import { TypeConstants } from "../../constants.js";

// Admin approve controller
export const adminApproveController = asyncHandler(async (req, res) => {
  const { type } = req.params;
  switch (type) {
    case TypeConstants.USER_ROLE_CHANGE:
      await approveUserRoleChange(req, res);
      break;
    default:
      res.status(400).json(new ApiResponse(400, null, "Invalid approval type"));
  }
});

// Approve user role change controller
const approveUserRoleChange = async (req, res) => {
  const { userId, role } = req.params;

  if (!userId || !role) {
    throw new ApiError(400, "User ID and role are required");
  }

  const approvedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true }
  );

  if (!approvedUser) {
    throw new ApiError(404, "User not found");
  }

  // Send success notification to the user
  const notificationData = {
    userId,
    title: "Role Change Request Approved",
    message: `Your role change request has been approved. You now have all the functionalities of ${role}.`,
    type: "success",
  };

  // send success notification to the user
  await sendNotification(
    notificationData.userId,
    notificationData.title,
    notificationData.message,
    notificationData.type
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        approvedUser,
        "Role change request has been approved"
      )
    );
};
