import axios from "axios";
import toast from "react-hot-toast";

export const uploadProfilePic = async (pic) => {
  if (pic === undefined) {
    toast.error("Please select an image!");
    return;
  }
  try {
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Turf-Booking-System");
      data.append("folder", "Turf-Booking-System/profile_pics");
      data.append("cloud_name", "fayaz1001");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/fayaz1001/image/upload",
        data
      );
      if (response) {
        return response.data.url;
      }
    } else {
      toast.error("Please select an image!");
    }
  } catch (error) {
    console.log({ "Error:": error.message });
  }
};


// multiple upload
export const uploadVenuePics = async (pic,venueName) => {
  if (pic === undefined) {
    toast.error("Please select images");
    return;
  }
  try {
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Turf-Booking-System");
      data.append("folder", `Turf-Booking-System/Venues/${venueName}`)
      data.append("cloud_name", "fayaz1001");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/fayaz1001/image/upload",
        data
      );
      if (response) {
        return response.data.url;
      }
    } else {
      toast.error("Please select images");
    }
  } catch (error) {
    console.log({ "Error:": error });
  }
};