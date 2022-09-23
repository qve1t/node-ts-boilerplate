import morgan from "morgan";
import { ENVS } from "./consts";
import { logError, logInfo } from "./logger";

morgan.token("message", (req, res: any) => res.locals.errorMessage || "");

const getIpFormat = () =>
  process.env.ENV === ENVS.PROD ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logInfo(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logError(message.trim()) },
});
