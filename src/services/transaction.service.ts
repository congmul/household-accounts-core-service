import { Transaction } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import { ITransactionCreatePayload, ITransactionUpdatePayload } from "../types";
import AppError from "../utils/errorHandler";

export const transactionService = {
  createTransaction: async (payload: ITransactionCreatePayload) => {
    try {
      const result = await Transaction.create(payload);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.createDbError("transaction").message, 500);
    }
  },
  getTransaction: async (transactionId: string) => {
    try {
      const transaction = await Transaction.findOne({ _id: transactionId });
      return transaction;
    } catch (err: any) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
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
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
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
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
    }
  },

  updateTransaction: async (
    transactionId: string,
    payload: ITransactionUpdatePayload,
  ) => {
    try {
      const result = await Transaction.findByIdAndUpdate(
        { _id: transactionId },
        { ...payload },
      );
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.updateDbError("transaction").message, 500);
    }
  },
  deleteTransaction: async (transactionId: string) => {
    try {
      const result = await Transaction.findByIdAndDelete({
        _id: transactionId,
      });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.deleteDbError("transaction").message, 500);
    }
  },
};
