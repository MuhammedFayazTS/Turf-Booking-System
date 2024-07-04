import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "./asyncHandler.js";

export const sendNotification = asyncHandler(
  async (userId, title, message, type, data) => {
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      data,
    });
    await notification.save();

    await User.findByIdAndUpdate(userId, {
      $push: { notifications: notification._id },
    });
  }
);

export const sendNotificationsToUsers = asyncHandler(
  async (userIds, title, message, type, data) => {
    const notifications = userIds.map((userId) => ({
      userId,
      title,
      message,
      type,
      data,
    }));

    const createdNotifications = await Notification.insertMany(notifications);

    const userUpdates = userIds.map((userId, index) =>
      User.findByIdAndUpdate(userId, {
        $push: { notifications: createdNotifications[index]._id },
      })
    );

    await Promise.all(userUpdates);
  }
);

export const sendAdminNotifications = asyncHandler(
  async (title, message, type, data) => {
    const adminUsers = await User.find({ role: "admin" });
    const adminIds = adminUsers.map((admin) => admin._id);
    sendNotificationsToUsers(adminIds, title, message, type, data);
  }
);
