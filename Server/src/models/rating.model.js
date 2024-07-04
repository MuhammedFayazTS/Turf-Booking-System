import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ratingSchema = new Schema(
  {
    turfId: {
      type: Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Rating = model("Rating", ratingSchema);

export default Rating;
