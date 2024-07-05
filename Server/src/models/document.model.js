import { Schema, model } from "mongoose";

const documentSchema = new Schema(
  {
    turfId: {
      type: Schema.Types.ObjectId,
      ref: "Turfs",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase: true,
      trim: true,
    },
    file: {
      type: String,
      required: [true, "Name is required"],
    },
    createdUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deletedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Document = model("Document", documentSchema);

export default Document;
