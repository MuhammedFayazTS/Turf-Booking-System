import mongoose from "mongoose";

const { Schema, model } = mongoose;

const timingOptionsSchema = new Schema(
  {
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
    description: {
      type: String,
      trim: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TimingOptions = model("TimingOptions", timingOptionsSchema);

export default TimingOptions;
