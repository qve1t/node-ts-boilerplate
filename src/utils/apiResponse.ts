interface ISuccessResponse {
  data: Record<string, any>;
  status: "OK";
  message: "";
}

interface IErrorResponse {
  data: Record<string, never>;
  status: "ERROR";
  message: string | Record<string, any>;
}

export const successR = (data: Record<string, any>): ISuccessResponse => {
  return {
    data: data,
    message: "",
    status: "OK",
  };
};

export const errorR = (message: string): IErrorResponse => {
  return {
    data: {},
    message: message,
    status: "ERROR",
  };
};
