import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import dbLoader from "./config/db";
import logger from "./utils/logger";
import { swaggerRoute, transactionRoute } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbLoader();

app.use("/", swaggerRoute);
app.use("/transaction", transactionRoute);

app.get("/health", (req: Request, res: Response) => {
  res.send({
    msg: "Household Accounts Core Service is healthy and ready to handle your requests.",
  });
});

// Start the server on the port
app.listen(config.port, () => logger.info(`Listening on PORT: ${config.port}`));
