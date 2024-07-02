import mongoose from "mongoose";

const connectDB = async () => {
    console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('DB_NAME:', process.env.DB_NAME);

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
