let REQUIRED_ENV: string[] = [];
let OPTIONAL_ENV: string[] = [];

export const setRequiredEnv = (envsToCheck: string[]) => {
  REQUIRED_ENV = envsToCheck;
};

export const setOptionalEnv = (envsToCheck: string[]) => {
  OPTIONAL_ENV = envsToCheck;
};

const envCheck = (exitIfFail = true, timeout = 5000) => {
  const fails: string[] = [];
  const optionalFails: string[] = [];

  REQUIRED_ENV.forEach((elem) => {
    !process.env[elem] && fails.push(elem);
  });

  OPTIONAL_ENV.forEach((elem) => {
    !process.env[elem] && optionalFails.push(elem);
  });

  if (optionalFails.length > 0) {
    const errors = optionalFails.join(", ");
    console.log("Started without env variables: " + errors);
  }

  if (fails.length > 0) {
    const errors = fails.join(", ");
    console.log(errors + "\nNOT PROVIDED! Check .env file");

    if (exitIfFail) {
      setTimeout(() => {
        process.exit(1);
      }, timeout);
    }
  }
};

export default envCheck;
