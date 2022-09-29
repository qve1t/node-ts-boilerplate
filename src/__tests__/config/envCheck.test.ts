import envCheck, {
  setOptionalEnv,
  setRequiredEnv,
} from "../../config/envCheck";

describe("envCheck", () => {
  let mockExit: any;
  let mockConsoleLog: any;
  beforeAll(() => {
    jest.useFakeTimers();
    mockExit = jest.spyOn(process, "exit").mockImplementation((number) => {
      throw new Error("process.exit: " + number);
    });
    mockConsoleLog = jest.spyOn(console, "log");
  });

  beforeEach(() => {
    setRequiredEnv([]);
    setOptionalEnv([]);
  });

  afterEach(() => {
    delete process.env.TEST;
  });

  afterAll(() => {
    jest.useRealTimers();
    mockExit.mockRestore();
  });

  test("should pass if required env is provided", () => {
    process.env.TEST = "test";
    setRequiredEnv(["TEST"]);
    envCheck();

    expect(mockExit).not.toBeCalled();
  });

  test("should pass if optional env is provided", () => {
    process.env.TEST = "test";
    setOptionalEnv(["TEST"]);
    envCheck();

    expect(mockExit).not.toBeCalled();
  });

  test("should pass and call console.log if optional env is not provided", () => {
    setOptionalEnv(["TEST"]);
    envCheck();

    expect(mockConsoleLog).toBeCalled();
    expect(mockExit).not.toBeCalled();
  });

  test("should not call process.exit", () => {
    setRequiredEnv(["TEST"]);
    envCheck(false);

    expect(mockExit).not.toBeCalled();
  });

  test("should not pass and call console.log if required env is not provided", () => {
    setRequiredEnv(["TEST"]);

    expect(() => {
      envCheck();
      jest.runAllTimers();
    }).toThrow();

    expect(mockExit).toBeCalledWith(1);
    expect(mockConsoleLog).toBeCalled();
  });

  test("should call process.exit", () => {
    setRequiredEnv(["TEST"]);

    expect(() => {
      envCheck();
      jest.runAllTimers();
    }).toThrow();

    expect(mockExit).toBeCalledWith(1);
  });
});
