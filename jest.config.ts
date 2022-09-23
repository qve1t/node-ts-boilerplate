import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.test\\.ts$",
  setupFiles: ["dotenv/config"],
};

export default config;
