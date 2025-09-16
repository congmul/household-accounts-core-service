import { Budget } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import { IBudgetCreatePayload, IBudgetUpdatePayload } from "../types";
import AppError from "../utils/errorHandler";
import mongoose from "mongoose";

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
  getBudgets: async (
    userId: string,
    accountBookId: string,
    year: number,
    month: number,
  ) => {
    try {
      const startDate = new Date(year, month - 1, 1, -7);
      const endDate = new Date(year, month, 1, -7);
      const accountBookObjectId = new mongoose.Types.ObjectId(accountBookId);
      const result = await Budget.aggregate([
        {
          $match: {
            userId: userId,
            accountBookId: accountBookObjectId,
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
  getBudget: async (budgetId: string) => {
    try {
      const budget = await Budget.findOne({ _id: budgetId });
      return budget;
    } catch (err: any) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("budget").message, 500);
    }
  },
  updateBudget: async (budgetId: string, payload: IBudgetUpdatePayload) => {
    try {
      const result = await Budget.findByIdAndUpdate(
        { _id: budgetId },
        { ...payload },
      );
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.updateDbError("budget").message, 500);
    }
  },
  deleteBudget: async (budgetId: string) => {
    try {
      const result = await Budget.findByIdAndDelete({
        _id: budgetId,
      });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.deleteDbError("budget").message, 500);
    }
  },
};
