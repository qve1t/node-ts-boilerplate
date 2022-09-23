import winston from "winston";
import { ENVS } from "./consts";

const logFormat = winston.format.printf((info) => {
  return `[${info.timestamp}] ${info.level} ${info.message} `;
});

const logsConfig = (filename: string) => {
  return {
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      logFormat
    ),
    transports: [
      process.env.ENV !== ENVS.PROD
        ? new winston.transports.Console()
        : new winston.transports.File({
            filename: filename,
            maxsize: 5242880, //5MB
            maxFiles: 10,
          }),
    ],
  };
};

const infoLogger = winston.createLogger({
  level: "info",
  ...logsConfig("./logs/info.log"),
});

const errorLogger = winston.createLogger({
  level: "error",
  ...logsConfig("./logs/error.log"),
});

export const logInfo = (message: string) => {
  infoLogger.info(message);
};

export const logError = (message: string) => {
  errorLogger.error(message);
};
