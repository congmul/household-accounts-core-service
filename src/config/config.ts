import { cleanEnv, str, makeValidator } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const noEmptyString = makeValidator((str) => {
  if (!str) {
    throw new Error("Cannot be an empty string");
  } else {
    return str;
  }
});

const env = cleanEnv(process.env, {
  PORT: str({ default: "3001" }),
  MONGO_URI: noEmptyString(),
  MONGO_DB_NAME: noEmptyString(),
  USER_SERVICE_URL: noEmptyString(),
});

const config = {
  port: env.PORT,
  db: {
    URI: env.MONGO_URI,
    DB_NAME: env.MONGO_DB_NAME,
  },
  user_service_url: env.USER_SERVICE_URL,
};

export default config;
