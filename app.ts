import express, { Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import { connectDB } from "./api/db/connect";

const port = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
