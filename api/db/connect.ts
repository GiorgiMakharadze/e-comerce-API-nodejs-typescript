import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err: any) {
    console.log("Error connecting to MongoDB:", err.message);
  }
};
