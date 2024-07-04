import mongoose from "mongoose";

const { Schema, model } = mongoose;

const timingSchema = new Schema(
  {
    turfId: {
      type: Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timing = model("Timing", timingSchema);

export default Timing;
