import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiError } from "./ApiError.js";

export const createAccessToken = async (user) => {
  if (!env.JWT_KEY) return;

  return jwt.sign(
    {
      data: user,
    },
    env.JWT_KEY,
    {
      expiresIn: "30m",
    }
  );
};

export const uploadFile = async (files, fieldname) => {
  if (!files || files.length === 0 || files[0]?.fieldname != fieldname) {
    throw new ApiError(400, `No file uploaded for field '${fieldname}'`);
  }

  const filePath = files[0]?.path;

  if (!filePath) {
    throw new ApiError(400, `Invalid file path for field '${fieldname}'`);
  }

  const uploadedFile = await uploadOnCloudinary(filePath);

  if (!uploadedFile) {
    throw new ApiError(500, "Error in uploading file");
  }

  return uploadedFile.url;
};
