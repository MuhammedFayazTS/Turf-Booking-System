import mongoose, { Schema, model } from "mongoose";

const amenitySchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const Amenity = model("Amenity", amenitySchema);

export default Amenity;
