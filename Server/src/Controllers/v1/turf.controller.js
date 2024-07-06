import Turf from "../../models/turf.model.js";
import TimingOptions from "../../models/timing.options.model.js";
import Timing from "../../models/timing.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Joi from "@hapi/joi";
import { ApiError } from "../../utils/ApiError.js";
import {
  sendAdminNotifications,
  sendNotification,
} from "../../utils/notification.helper.js";
import { uploadFiles } from "../../utils/helper.js";
import Document from "../../models/document.model.js";
import { TypeConstants } from "../../constants.js";

// turf schema
const schema = Joi.object({
  _id: Joi.optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).max(15).required(),
  name: Joi.string().min(1).max(20).required(),
  price: Joi.number().required(),
  createdUserId: Joi.required(),
  updatedUserId: Joi.any(),
  deletedUserId: Joi.any(),
  location: Joi.required(),
  overview: Joi.string().required(),
  sports: Joi.array().required(),
  timings: Joi.array().min(1).required(),
  amenities: Joi.array().optional(),
  ratings: Joi.array(),
  additionalCharge: Joi.number(),
  documents: Joi.array().required(),
});

export const turfInputValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(new ApiError(400, "All fields are required", error.message));
  }

  next();
};

const create = asyncHandler(async (req, res, next) => {
  const { email, phone, name, timings, location, documents } = req.body;

  const existedTurf = await Turf.findOne({ $or: [{ email }, { phone }] });

  if (existedTurf) {
    return res
      .status(409)
      .json(
        new ApiResponse(
          409,
          null,
          "Turf with email or phone number already exists"
        )
      );
  }

  const files = req.files;

  // Process multiple images
  const uploadedImages = await uploadFiles(files, "images");

  if (uploadedImages.includes(null)) {
    throw new ApiError(400, "Failed to upload images");
  }

  const createdUserRole = req.user.role;
  const status = createdUserRole === "admin" ? "approved" : "pending";

  const newTurf = new Turf({
    ...req.body,
    email,
    phone,
    status,
    images: uploadedImages,
    documentsId: [],
    timingsId: [],
    location,
    name: name.toLowerCase(),
  });
  const createdTurf = await newTurf.save();

  if (!createdTurf) {
    throw new ApiError(500, "Something went wrong while creating the turf");
  }

  // save documents
  const createdDocuments = await saveDocuments(files, documents, createdTurf);
  createdTurf.documentsId = createdDocuments.map((document) => document._id);
  await createdTurf.save();

  // Create multiple turf timings
  const createdTurfTimings = await getTimings(timings, createdTurf);

  createdTurf.timingsId = createdTurfTimings.map((timing) => timing._id);

  await createdTurf.save();

  if (createdUserRole !== "admin") {
    //send approval request notification to admin
    const title = `Turf Adding Request from ${req.user.username}`;
    const message = `New turf adding request from ${req.user.username} to add ${createdTurf.name}`;
    const data = {
      turfId: createdTurf._id,
      turfDocuments: createdTurf.documentsId,
      approveUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.TAR}/${createdUserId}/approve`,
      rejectUrl: `${process.env.SERVER_URL}/admin/${TypeConstants.TAR}/${createdUserId}/reject`,
      requestDate: new Date(),
    };

    sendAdminNotifications(title, message, "info", data);
    //notification to owner asking to wait for approval
    const notificationTitleForOwner = "Turf Addition Request Sent Successfully";
    const notificationMessageForOwner =
      "Your request to add a new turf has been successfully submitted. Please await approval from the administrator.";

    sendNotification(
      req.body.createdUserId,
      notificationTitleForOwner,
      notificationMessageForOwner,
      "info",
      data
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTurf, "Turf added successfully"));
});

//helpers
const getTimings = async (timings, createdTurf) => {
  // Check if timings array is provided and not empty
  if (!timings || !Array.isArray(timings) || timings.length === 0) {
    await Turf.findByIdAndDelete(createdTurf._id);
    throw new ApiError(400, "Timings must not be empty");
  }

  const newTimings = await TimingOptions.find({ _id: { $in: timings } });

  if (!newTimings || newTimings.length === 0) {
    await Turf.findByIdAndDelete(createdTurf._id);
    throw new ApiError(400, "No timings found");
  }

  const turfTimingsData = newTimings.map((timing) => ({
    turfId: createdTurf._id,
    timingId: timing._id,
    startTime: timing.startTime,
    endTime: timing.endTime,
    dayOfWeek: timing.dayOfWeek,
  }));

  return await Timing.insertMany(turfTimingsData);
};

const saveDocuments = async (files, documents, createdTurf) => {
  // Check if documents array is provided and not empty
  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    await Turf.findByIdAndDelete(createdTurf._id);
    throw new ApiError(400, "Documents must not be empty");
  }

  // Process multiple documents
  const uploadedDocuments = await uploadFiles(files, "documentFiles");

  if (uploadedDocuments.includes(null)) {
    await Turf.findByIdAndDelete(createdTurf._id);
    throw new ApiError(400, "Failed to upload documents");
  }
  // Check if uploaded documents array is  not empty
  if (
    !uploadedDocuments ||
    !Array.isArray(uploadedDocuments) ||
    uploadedDocuments.length === 0
  ) {
    await Turf.findByIdAndDelete(createdTurf._id);
    throw new ApiError(400, "Documents must not be empty");
  }

  const turfDocumentsData = documents.map((document, index) => ({
    turfId: createdTurf._id,
    name: document.name,
    file: uploadedDocuments[index],
  }));

  return await Document.insertMany(turfDocumentsData);
};

export { create };
