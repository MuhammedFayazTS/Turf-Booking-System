import mongoose from "mongoose";
import Sports from "../models/sports.model.js";
import Amenities from "../models/amenity.model.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { generateFakeData } from "../utils/helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedDb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);

    // Clear the existing collections
    await Sports.deleteMany({});
    await Amenities.deleteMany({});

    // generate fake data
    const sportsData = generateFakeData(10, 1);
    const amenitiesData = generateFakeData(5, 2);

    // add the data to the database
    await Sports.insertMany(sportsData);
    await Amenities.insertMany(amenitiesData);

    console.log("Seeders added");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedDb();
