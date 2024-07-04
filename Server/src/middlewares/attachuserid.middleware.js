import { asyncHandler } from "../utils/asyncHandler.js";

export const attachUserId = asyncHandler(async (req, res, next) => {
  switch (req.method) {
    case "POST":
      req.body.createdUserId = req.user?._id;
      req.body.updatedUserId = req?.user?._id;
      break;

    case "PUT":
      req.body.updatedUserId = req?.user?._id;
      break;

    case "PATCH":
      req.body.updatedUserId = req?.user?._id;
      break;

    case "DELETE":
      req.body.deletedUserId = req?.user?._id;
      break;
  }

  next();
});
