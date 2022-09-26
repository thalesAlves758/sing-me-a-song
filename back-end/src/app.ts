import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import databaseRouter from "./routers/databaseRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);

if (["development", "test"].includes(process.env.NODE_ENV)) {
  app.use(databaseRouter);
}

app.use(errorHandlerMiddleware);

export default app;
