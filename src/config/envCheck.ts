const REQUIRED_ENV = ["ENV", "PORT"];

const envCheck = (exitIfFail = true, timeout = 5000) => {
  const fails: string[] = [];

  REQUIRED_ENV.forEach((elem) => {
    !process.env[elem] && fails.push(elem);
  });

  if (fails.length > 0) {
    const errors = fails.join(", ");
    console.log(errors + " NOT PROVIDED!\n Check .env file");

    if (exitIfFail) {
      setTimeout(() => {
        process.exit(1);
      }, timeout);
    }
  }
};

export default envCheck;
