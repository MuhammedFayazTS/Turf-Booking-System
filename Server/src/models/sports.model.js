import mongoose, { Schema, model } from "mongoose";

const sportsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
    },
    createdUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    deletedUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Sport = model("Sport", sportsSchema);

export default Sport;
