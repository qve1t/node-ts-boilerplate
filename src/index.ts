import dotenv from "dotenv";
import express from "express";
import envCheck, { setOptionalEnv, setRequiredEnv } from "./config/envCheck";
import { logInfo } from "./config/logger";
import { errorHandler, successHandler } from "./config/morgan";
import unexpectedErrorHandler from "./config/unexpectedErrorHandler";

dotenv.config();
setRequiredEnv(["ENV", "PORT"]);
setOptionalEnv([]);
envCheck();

const app = express();

app.use(successHandler);
app.use(errorHandler);
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logInfo(`Server listening on port ${port}`);
});

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  logInfo("SIGTERM received");
});
