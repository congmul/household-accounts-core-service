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
  createAllPreMonthBudget: async (payload: {
    userId: string;
    accountBookId: string;
  }) => {
    try {
      // Grab previous month budgets
      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      const startDate = new Date(
        Date.UTC(
          previousMonth.getFullYear(),
          previousMonth.getMonth(),
          1,
          0,
          0,
          0,
          0,
        ),
      );
      const endDate = new Date(
        Date.UTC(
          previousMonth.getFullYear(),
          previousMonth.getMonth() + 1,
          1,
          0,
          0,
          0,
          0,
        ),
      );
      const budgets = await Budget.find({
        userId: payload.userId,
        accountBookId: payload.accountBookId,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      // Determine which categories already have a budget for the target date
      const existingForTarget = await Budget.find({
        userId: payload.userId,
        accountBookId: payload.accountBookId,
        date: endDate,
      }).select("category");

      const existingCategories = new Set(
        existingForTarget.map((b: any) => String(b.category)),
      );

      // Only create budgets for categories that don't already exist on the target date
      const tempBudgets = budgets
        .filter((budget) => {
          const cat = String((budget as any).category);
          return !existingCategories.has(cat);
        })
        .map((budget) => ({
          userId: budget.userId,
          accountBookId: budget.accountBookId,
          date: endDate,
          amount: budget.amount,
          category: budget.category,
        }));

      const result =
        tempBudgets.length > 0 ? await Budget.create(tempBudgets) : [];
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
      // Use UTC constructors so start/end are at 00:00:00.000Z for the given month
      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
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
