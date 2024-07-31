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
  getBudgets: async (userId: string, year: number, month: number) => {
    try {
      const startDate = new Date(year, month - 1, 1, -7);
      const endDate = new Date(year, month, 1, -7);
      const result = await Budget.aggregate([
        {
          $match: {
            userId: userId,
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            budgets: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.createDbError("budget").message, 500);
    }
  },
};
