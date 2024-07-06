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
  },
  {
    timestamps: true,
  }
);

const Document = model("Document", documentSchema);

export default Document;
