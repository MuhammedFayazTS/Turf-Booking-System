import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiError } from "./ApiError.js";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

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

//upload multiple files
export const uploadFiles = async (files, fieldname) => {
  // Check if files array is empty or doesn't match the specified fieldname
  if (
    !files ||
    files.length === 0 ||
    files.every((file) => file.fieldname !== fieldname)
  ) {
    throw new ApiError(400, `No file uploaded for field '${fieldname}'`);
  }

  const uploadedFilesUrls = [];

  // Iterate through files to upload each one
  for (let file of files) {
    if (file.fieldname === fieldname) {
      const filePath = file.path;

      if (!filePath) {
        throw new ApiError(400, `Invalid file path for field '${fieldname}'`);
      }

      const uploadedFile = await uploadOnCloudinary(filePath);

      if (!uploadedFile) {
        throw new ApiError(500, `Error in uploading file ${file.originalname}`);
      }

      uploadedFilesUrls.push(uploadedFile.url);
    }
  }

  return uploadedFilesUrls;
};

// Function to generate fake data array
export const generateFakeData = (limit, numberOfWords) => {
  const data = [];

  for (let i = 0; i < limit; i++) {
    const item = {
      name: faker.lorem.words(numberOfWords),
    };
    data.push(item);
  }

  return data;
};

/**
 * Helper function to calculate pagination parameters.
 * @param {number} page - Current page number (default: 1).
 * @param {number} limit - Number of items per page (default: 10).
 * @returns {Object} Pagination parameters: skip, limitNum, pageNum.
 */

//get paginaation helper
export const getPagination = (page = 1, limit = 10) => {
  const limitNum = parseInt(limit, 10);
  const pageNum = parseInt(page, 10);

  // Calculate the number of documents to skip
  const skip = (pageNum - 1) * limitNum;

  return { skip, limitNum, pageNum };
};

/**
 * Calculate token expiry.
 * @param {string} accessToken - The JWT access token.
 * @returns {Date} - The expiry date of the token.
 * @throws {Error} - Throws an error if the token is invalid.
 */
export const getTokenExpiry = (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token is required");
  }

  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken || !decodedToken.exp) {
      throw new Error("Invalid token");
    }

    const tokenExpiry = new Date(0);
    tokenExpiry.setUTCSeconds(decodedToken.exp);

    return tokenExpiry;
  } catch (error) {
    throw new Error("Failed to verify token: " + error.message);
  }
};
