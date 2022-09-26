import { Router } from "express";
import databaseController from "../controllers/databaseController.js";

const databaseRouter = Router();

databaseRouter.post("/database/reset", databaseController.reset);

export default databaseRouter;
