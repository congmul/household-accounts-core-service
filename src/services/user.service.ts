import axios from "axios";
import config from "../config/config";
import logger from "../utils/logger";
import AppError from "../utils/errorHandler";

export const userService = {
  checkExist: async (userId: string) => {
    try {
      await axios.get(`${config.user_service_url}/user/check-exist/${userId}`);
      return true;
    } catch (err: any) {
      if (err.code === "ECONNREFUSED") {
        logger.info("Cannot connect to User serivce");
        throw new AppError("Cannot connect to User serivce", 500);
      } else if (err.response.status === 404) {
        logger.info(err.response.data);
        return false;
      } else {
        throw new AppError("Unknown error occurred.", 500);
      }
    }
  },
};
