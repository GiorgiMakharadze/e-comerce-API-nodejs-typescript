import express, { Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import coockieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import authRouter from "./api/routes/authRoutes";
import userRoutes from "./api/routes/userRoutes";
import productRoutes from "./api/routes/productRoutes";
import reviewRoutes from "./api/routes/reviewRoutes";

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(coockieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("e-comerce-api");
});
//test route
app.get("/api/v1", (req: Request, res: Response) => {
  console.log(req.signedCookies);
  res.send("e-comerce-api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);

//error handler middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

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
