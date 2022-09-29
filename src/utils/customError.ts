class CustomError extends Error {
  status: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.status = statusCode || 500;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
export default CustomError;
