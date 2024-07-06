import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { sendNotification } from "../../utils/notification.helper.js";
import { TypeConstants } from "../../constants.js";
import User from "../../models/user.model.js";
import Turf from "../../models/turf.model.js";

// Admin approve controller
export const adminApproveController = asyncHandler(async (req, res) => {
  const { type } = req.params;
  switch (type) {
    case TypeConstants.USER_ROLE_CHANGE:
      await approveUserRoleChange(req, res);
      break;
    case TypeConstants.TURF_CREATE_REQUEST:
      await approveAddTurf(req, res);
      break;
    default:
      res.status(400).json(new ApiResponse(400, null, "Invalid approval type"));
  }
});

// Approve user role change controller
const approveUserRoleChange = async (req, res) => {
  const { id, role } = req.params;

  if (!id || !role) {
    throw new ApiError(400, "User ID and role are required");
  }

  const approvedUser = await User.findByIdAndUpdate(
    id,
    { $set: { role } },
    { new: true }
  );

  if (!approvedUser) {
    throw new ApiError(404, "User not found");
  }

  // Send success notification to the user
  const notificationData = {
    id,
    title: "Role Change Request Approved",
    message: `Your role change request has been approved. You now have all the functionalities of ${role}.`,
    type: "success",
  };

  // send success notification to the user
  await sendNotification(
    notificationData.id,
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

// Approve add turf change controller
const approveAddTurf = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Turf ID is required");
  }

  const approvedTurf = await Turf.findByIdAndUpdate(
    id,
    { $set: { status: "approved" } },
    { new: true }
  );

  if (!approvedTurf) {
    throw new ApiError(404, "Turf not found");
  }

  const updatedTurf = await Turf.findById(id);

  // Send success notification to the turf owner
  const notificationData = {
    id: updatedTurf.createdUserId,
    title: "Turf add request approved",
    message: `Your request for adding ${updatedTurf.name} has been approved.`,
    type: "success",
  };

  // send success notification to the user
  await sendNotification(
    notificationData.id,
    notificationData.title,
    notificationData.message,
    notificationData.type
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedTurf, "Role change request has been approved")
    );
};
