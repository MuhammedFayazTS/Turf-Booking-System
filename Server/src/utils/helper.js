import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiError } from "./ApiError.js";
import { faker } from "@faker-js/faker";

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
  if (!files || files.length === 0 || files.every(file => file.fieldname !== fieldname)) {
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
