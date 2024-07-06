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
    case TypeConstants.URC:
      await approveUserRoleChange(req, res);
      break;
    case TypeConstants.TAR:
      await approveAddTurf(req, res);
      break;
    default:
      res.status(400).json(new ApiResponse(400, null, "Invalid approval type"));
  }
});

// Admin approve controller
export const adminRejectController = asyncHandler(async (req, res) => {
  const { type } = req.params;
  switch (type) {
    case TypeConstants.URC:
      await rejectUserRoleChange(req, res);
      break;
    case TypeConstants.TAR:
      await rejectAddTurf(req, res);
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
    title: "Role change request approved",
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

// Reject user role change controller
const rejectUserRoleChange = async (req, res) => {
  const { id, role } = req.params;

  if (!id || !role) {
    throw new ApiError(400, "User ID and role are required");
  }

  // Send reject notification to the user
  const notificationData = {
    id,
    title: "Role change request rejected",
    message: `Your role change request for ${role} has been rejected.`,
    type: "alert",
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
    .json(new ApiResponse(200, {}, "Role change request has been rejected"));
};

// Reject add turf change controller
const rejectAddTurf = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Turf ID is required");
  }

  const existedTurf = await Turf.findById(id);

  // Send notification to the turf owner
  const notificationData = {
    id: existedTurf.createdUserId,
    title: "Turf add request rejected",
    message: `Your request for adding ${updatedTurf.name} has been rejected.`,
    type: "alert",
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
      new ApiResponse(200, existedTurf, "Role change request has been rejected")
    );
};
