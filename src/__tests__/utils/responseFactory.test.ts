import { errorR, successR } from "../../utils/apiResponse";

describe("apiResponse", () => {
  describe("Create success response", () => {
    test("should create response with provided data", () => {
      const testData = { status: "test", value: "test" };

      const response = successR(testData);
      expect(response).toEqual({
        data: testData,
        message: "",
        status: "OK",
      });
    });
  });

  describe("Create error response", () => {
    test("should create response with provided message", () => {
      const testMessage = "test message";

      const response = errorR(testMessage);
      expect(response).toEqual({
        data: {},
        message: testMessage,
        status: "ERROR",
      });
    });
  });
});
