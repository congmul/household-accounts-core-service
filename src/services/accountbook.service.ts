import { AccountBook } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import AppError from "../utils/errorHandler";

export const accountbookService = {
  getAccountbooks: async (userId: string) => {
    try {
      const result = await AccountBook.find({ "userList.userId": userId });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("account book").message, 500);
    }
  },
};
