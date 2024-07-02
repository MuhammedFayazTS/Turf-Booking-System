import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["info", "warning", "alert", "success"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", NotificationSchema);
export default Notification;
