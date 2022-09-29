import CustomError from "../../utils/customError";

describe("CustomError", () => {
  test("should create custom error with status 500", () => {
    const error = new CustomError("");

    expect(error.message).toBe("");
    expect(error.status).toBe(500);
  });

  test("should create custom error with custom message", () => {
    const error = new CustomError("test error");

    expect(error.message).toBe("test error");
    expect(error.status).toBe(500);
  });

  test("should create custom error with custom message and custom status", () => {
    const error = new CustomError("test error", 403);

    expect(error.message).toBe("test error");
    expect(error.status).toBe(403);
  });
});
