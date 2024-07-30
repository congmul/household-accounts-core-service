import { Transaction } from "../models";
import logger from "../utils/logger";
import { TransactionMsg } from "../config/msgs";
import { ITransactionCreatePayload } from "../types";

export const transactionService = {
  createTransaction: async (payload: ITransactionCreatePayload) => {
    try {
      const result = await Transaction.create(payload);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(TransactionMsg.createDbError.message);
    }
  },
  getExpenses: async (userId: string, year: number, month: number) => {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      const result = await Transaction.aggregate([
        {
          $match: {
            userId: userId,
            type: { $ne: "income" },
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            transactions: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(TransactionMsg.getDbError.message);
    }
  },
  getIncomes: async (userId: string, year: number, month: number) => {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      const result = await Transaction.aggregate([
        {
          $match: {
            userId: userId,
            type: { $ne: "expense" },
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            transactions: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error(TransactionMsg.getDbError.message);
    }
  },
};
