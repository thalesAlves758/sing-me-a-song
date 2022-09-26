import { Request, Response } from "express";
import { resetDatabase } from "../services/databaseService.js";

async function reset(req: Request, res: Response) {
  await resetDatabase();

  res.status(200).send("database reseted");
}

export default { reset };
