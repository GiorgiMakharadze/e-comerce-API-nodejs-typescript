import express, { Request, Response } from "express";
import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import authRouter from "./api/routes/authRoutes";

const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("e-comerce-api");
});

app.use("/api/v1/auth", authRouter);

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
