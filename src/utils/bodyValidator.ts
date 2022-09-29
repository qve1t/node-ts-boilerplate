import { validate } from "class-validator";
import CustomError from "./customError";

export const bodyValidate = async (
  body: Record<string, any>,
  objectToValidate: any
) => {
  for (const [key, value] of Object.entries(body)) {
    objectToValidate[key] = value;
  }

  const errorsList = await validate(objectToValidate);
  if (errorsList.length) {
    const errorMessage: string[] = [];
    errorsList.forEach((elem: any) => {
      const message = Object.values(elem.constraints).join(", ");
      errorMessage.push(elem.property + ": " + message);
    });
    throw new CustomError(errorMessage.join(" | "), 403);
  }
};
