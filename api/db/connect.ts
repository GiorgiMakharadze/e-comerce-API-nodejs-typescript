import mongoose from "mongoose";

export const connectDB = (url: string) => {
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("Error connecting to MongoDB:", err.message));
};
