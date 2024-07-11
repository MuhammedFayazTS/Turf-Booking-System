import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const { Schema, model } = mongoose;

//TODO: add soft delete support

const turfSchema = new Schema(
  {
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
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      name: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
      },
    },
    email: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    timingsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timing",
        required: true,
      },
    ],
    sportsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sport",
        required: true,
      },
    ],
    amenitiesId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    additionalCharge: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    documentsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Document",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  {
    timestamps: true,
  }
);

turfSchema.plugin(aggregatePaginate)

const Turf = model("Turfs", turfSchema);

export default Turf;
