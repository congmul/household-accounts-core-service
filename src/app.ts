import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import dbLoader from "./config/db";
import logger from "./utils/logger";
import {
  swaggerRoute,
  transactionRoute,
  categoryRoute,
  budgetRoute,
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbLoader();

app.use("/", swaggerRoute);
app.use("/transaction", transactionRoute);
app.use("/category", categoryRoute);
app.use("/budget", budgetRoute);

app.get("/health", (req: Request, res: Response) => {
  res.send({
    msg: "Household Accounts Core Service is healthy and ready to handle your requests.",
    app_version: process.env.npm_package_version,
  });
});

// Start the server on the port
app.listen(config.port, () => logger.info(`Listening on PORT: ${config.port}`));
