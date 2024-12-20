import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (loacalFilePath) => {
  try {
    if (!loacalFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(loacalFilePath, {
      resource_type: "auto",
    });

    // file has been successfully uploaded
    console.log("###file upoaded in cloudinary### ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(loacalFilePath); // remove local stored temporary file
    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    if (response.result === "ok") {
      console.log("### file deleted from cloudinary ###", publicId);
      return response;
    } else {
      console.error("### error deleting file from cloudinary ###", response);
      return null;
    }
  } catch (error) {
    console.error("### error deleting file from cloudinary ###", error);
    return null;
  }
};
