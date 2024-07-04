import Turf from "../../models/turf.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Joi from "@hapi/joi";
import { ApiError } from "../../utils/ApiError.js";
import {
  sendAdminNotifications,
  sendNotification,
} from "../../utils/notification.helper.js";

//TODO: headle file saving.
//TODO: add multer middleware and any cloud for image storing.

// turf schema
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(8).max(15).required(),
  name: Joi.string().min(1).max(20).required(),
  price: Joi.number().required(),
  createdUserId: Joi.required(),
  location: Joi.required(),
  overview: Joi.required(),
  sportsId: Joi.required(),
  images: Joi.required(),
});

export const createTurfInputValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        new ApiError(400, "All fields are required", "All fields are required")
      );
  }

  next();
};

const create = asyncHandler(async (req, res) => {
  const { email, phone, ...restBody } = req.body;

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

  const createdUserRole = req.user.role;
  const status = createdUserRole === "admin" ? "approved" : "pending";

  const newTurf = new Turf({ ...restBody, email, phone, status });
  const createdTurf = await newTurf.save();

  if (!createdTurf) {
    throw new ApiError(500, "Something went wrong while creating the turf");
  }

  if (createdUserRole !== "admin") {
    //send approval request notification to admin
    const title = `Turf Adding Request from ${req.user.username}`;
    const message = `New turf adding request from ${req.user.username} to add ${createdTurf.name}`;
    const data = {
      turfId: createdTurf._id,
      requestDate: new Date(),
    };
    sendAdminNotifications(title, message, "info", data);
    //notification to owner asking to wait for approval
    const notificationTitleForOwner = "Turf Addition Request Sent Successfully";
    const notificationMessageForOwner =
      "Your request to add a new turf has been successfully submitted. Please await approval from the administrator.";
    sendNotification(req.createdUserId, title, message, type, data);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTurf, "Turf added successfully"));
});

export { create };
