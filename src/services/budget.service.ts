import { Budget } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import { IBudgetCreatePayload, IBudgetUpdatePayload } from "../types";
import AppError from "../utils/errorHandler";

export const budgetService = {
  createBudget: async (payload: IBudgetCreatePayload) => {
    try {
      const result = await Budget.create(payload);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.createDbError("budget").message, 500);
    }
  },
};
