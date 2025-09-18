import { Transaction } from "../models";
import logger from "../utils/logger";
import { ErrorMsg } from "../config/msgs";
import { ITransactionCreatePayload, ITransactionUpdatePayload } from "../types";
import AppError from "../utils/errorHandler";
import { addMonths } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export const transactionService = {
  createTransaction: async (payload: ITransactionCreatePayload) => {
    try {
      // If type === "expense" && fixedExpenseMonthly === true
      // then need to create repeated expenses until the end date with fixedSeriesId (UUID)
      if (payload.type === "expense" && payload.fixedExpenseMonthly) {
        // Generate a unique series ID
        const fixedSeriesId = uuidv4();
        let startDate = new Date(payload.date);
        // if there is no endDate, it will be after 12months
        const endDate = payload.endDate
          ? new Date(payload.endDate)
          : addMonths(startDate, 12);
        const fixedExpenses: ITransactionCreatePayload[] = [];
        while (startDate <= endDate) {
          const createNewPayload = {
            ...payload,
            date: startDate,
            fixedSeriesId,
          };
          fixedExpenses.push(createNewPayload);
          startDate = addMonths(startDate, 1);
        }
        const result = await Transaction.insertMany(fixedExpenses);
        return result;
      } else {
        const result = await Transaction.create(payload);
        return result;
      }
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
  getExpenses: async (
    accountBookId: string,
    year: number,
    month: number,
    groupBy: string,
  ) => {
    try {
      logger.info("getExpenses");
      const startDate = new Date(year, month - 1, 1, -7);
      const endDate = new Date(year, month, 1, -7);
      let group: any;
      if (groupBy == "undefined") {
        group = { $dateToString: { format: "%Y-%m-%d", date: "$date" } };
      } else {
        group =
          groupBy === "date"
            ? { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
            : "$category";
      }

      const accountBookObjectId = new mongoose.Types.ObjectId(accountBookId);

      const result = await Transaction.aggregate([
        {
          $match: {
            accountBookId: accountBookObjectId,
            type: { $eq: "expense" },
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: group,
            transactions: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: {
            _id: 1, // Sort by the _id field which contains the formatted date string
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
    }
  },
  getIncomes: async (
    accountBookId: string,
    year: number,
    month: number,
    groupBy: string,
  ) => {
    try {
      logger.info("getIncomes");
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      const accountBookObjectId = new mongoose.Types.ObjectId(accountBookId);
      if (groupBy && groupBy === "date") {
        const result = await Transaction.aggregate([
          {
            $match: {
              accountBookId: accountBookObjectId,
              type: { $eq: "income" },
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
          {
            $sort: {
              _id: 1, // Sort by the _id field which contains the formatted date string
            },
          },
        ]);
        return result;
      } else {
        const result = await Transaction.aggregate([
          {
            $match: {
              accountBookId: accountBookObjectId,
              type: { $eq: "income" },
              date: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          },
          {
            $sort: {
              date: 1, // Sort by the _id field which contains the formatted date string
            },
          },
        ]);
        return result;
      }
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
    }
  },
  getInvestments: async (
    accountBookId: string,
    year: number,
    month: number,
    groupBy: string,
  ) => {
    try {
      logger.info("getInvestments");
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      const accountBookObjectId = new mongoose.Types.ObjectId(accountBookId);
      if (groupBy && groupBy === "date") {
        const result = await Transaction.aggregate([
          {
            $match: {
              accountBookId: accountBookObjectId,
              type: { $eq: "investment" },
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
          {
            $sort: {
              _id: 1, // Sort by the _id field which contains the formatted date string
            },
          },
        ]);
        return result;
      } else {
        const result = await Transaction.aggregate([
          {
            $match: {
              accountBookId: accountBookObjectId,
              type: { $eq: "investment" },
              date: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          },
          {
            $sort: {
              date: 1, // Sort by the _id field which contains the formatted date string
            },
          },
        ]);
        return result;
      }
    } catch (err) {
      logger.error(err);
      throw new AppError(ErrorMsg.getDbError("transaction").message, 500);
    }
  },
  getPendingTransactions: async () => {
    try {
      const result = await Transaction.aggregate([
        {
          $match: {
            pending: true,
          },
        },
        {
          $group: {
            _id: "$userId",
            transactions: { $push: "$$ROOT" },
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(
        ErrorMsg.getDbError("pending transactions").message,
        500,
      );
    }
  },
  getThisMonthPendingTransactions: async () => {
    try {
      const startOfMonth = new Date();
      startOfMonth.setUTCDate(1);
      startOfMonth.setUTCHours(0, 0, 0, 0); // ex) August 1st 00:00

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1); // ex) September 1st 00:00 (non-inclusive upper bound)

      const result = await Transaction.aggregate([
        {
          $match: {
            pending: true,
            date: {
              $gte: startOfMonth,
              $lt: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: "$userId",
            transactions: { $push: "$$ROOT" },
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(
        ErrorMsg.getDbError("pending transactions").message,
        500,
      );
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
  deleteAllFixedExpensesAfterDate: async (
    fixedSeriesId: string,
    afterDate: Date,
  ) => {
    try {
      const result = await Transaction.deleteMany({
        fixedSeriesId,
        date: { $gte: afterDate },
      });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(
        ErrorMsg.deleteDbError(
          "all fixedExpense after a specific date",
        ).message,
        500,
      );
    }
  },
  deleteAllFixedExpenses: async (fixedSeriesId: string) => {
    try {
      const result = await Transaction.deleteMany({
        fixedSeriesId,
      });
      return result;
    } catch (err) {
      logger.error(err);
      throw new AppError(
        ErrorMsg.deleteDbError("all fixedExpense").message,
        500,
      );
    }
  },
};
