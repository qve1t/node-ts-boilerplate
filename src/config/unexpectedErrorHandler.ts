import { logError } from "./logger";

const unexpectedErrorHandler = (error: any) => {
  logError(error);
  process.exit(1);
};

export default unexpectedErrorHandler;
