import { bodyValidate } from "../../utils/bodyValidator";
import CustomError from "../../utils/customError";
import { ExampleDto } from "./stubs/bodyValidator.stub";

describe("bodyValidator", () => {
  let stubToValidate: ExampleDto;

  beforeEach(() => {
    stubToValidate = new ExampleDto();
  });

  test("validate without errors if body contains all fields", async () => {
    const testBody = {
      testValue1: "test1",
      testValue2: "test2",
      testValue3: true,
    };
    await expect(
      bodyValidate(testBody, stubToValidate)
    ).resolves.not.toBeInstanceOf(CustomError);
  });

  test("should throw an instance of CustomError", async () => {
    const testBody = {
      testValue1: "test1",
      testValue2: "test2",
      testValue3: "Sdf",
    };
    await expect(bodyValidate(testBody, stubToValidate)).rejects.toBeInstanceOf(
      CustomError
    );
  });

  test("should throw CustomError with message from class-validator", async () => {
    const testBody = {
      testValue1: false,
      testValue2: 123,
      testValue3: "asd",
    };
    try {
      await bodyValidate(testBody, stubToValidate);
    } catch (error: any) {
      expect(error.message).toMatch(/testValue1/i);
      expect(error.message).toMatch(/testValue2/i);
      expect(error.message).toMatch(/testValue3/i);
    }
  });
});
