import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = (url: string) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("Error connecting to MongoDB:", err.message));
};
