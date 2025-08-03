import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { transactionService, userService } from "../services";
import logger from "../utils/logger";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }
    await transactionService.createTransaction(req.body);
    res.status(201).send(SuccessMsg.create("transcation"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    const { type, year, month, groupBy } = req.query;
    let result: any;
    if (type === "expense") {
      result = await transactionService.getExpenses(
        userId,
        parseInt(year as string),
        parseInt(month as string),
        groupBy as string,
      );
    } else if (type === "income") {
      // income
      result = await transactionService.getIncomes(
        userId,
        parseInt(year as string),
        parseInt(month as string),
        groupBy as string,
      );
    } else if (type === "investment") {
      result = await transactionService.getInvestments(
        userId,
        parseInt(year as string),
        parseInt(month as string),
        groupBy as string,
      );
    }

    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res
      .status(err.statusCode)
      .send({ message: err.message, statusCode: err.statusCode });
  }
};

export const getPendingTransactions = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    if (type === "this_month") {
      const result = await transactionService.getThisMonthPendingTransactions();
      return res.status(200).send(result);
    }

    const result = await transactionService.getPendingTransactions();
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res
      .status(err.statusCode)
      .send({ message: err.message, statusCode: err.statusCode });
  }
};
export const patchTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    // Check if the transaction exists
    const transaction = await transactionService.getTransaction(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Transaction"), transactionId });
    }

    // TODO: If it is expense && turn off fixedExpenseMonthly,
    // Grab fixedSeriesId
    // then need to remove all future expenses
    await transactionService.updateTransaction(transactionId, req.body);

    res.status(200).send(SuccessMsg.update("Transcation"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    // Check if the transaction exists
    const transaction = await transactionService.getTransaction(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Transaction"), transactionId });
    }
    await transactionService.deleteTransaction(transactionId);
    res.status(200).send(SuccessMsg.delete("Transcation"));
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const deleteFixedExpense = async (req: Request, res: Response) => {
  try {
    const { transactionId, fixedSeriesId } = req.params;
    const { action } = req.query;
    // Check if the transaction exists
    const transaction = await transactionService.getTransaction(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Transaction"), transactionId });
    }
    if (transaction.fixedSeriesId !== fixedSeriesId) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Fixed Expenses"), fixedSeriesId });
    }

    /**
     * Check if is in fixedExpenseMonthly and has fixedSeriesId
     * Then it needs options to delete the transaction("expenses")
     * options (action = 'only_one', 'following', 'all')
     *  1. Delete one of the series expenses
     *  2. Delete all of the future expenses from transaction.date
     *  3. Delete all that has the same series Id
     */
    if (action === "only_one") {
      await transactionService.deleteTransaction(transactionId);
    } else if (action === "following") {
      await transactionService.deleteAllFixedExpensesAfterDate(
        fixedSeriesId,
        transaction.date,
      );
    } else {
      // all
      await transactionService.deleteAllFixedExpenses(fixedSeriesId);
    }
    res.status(200).send(SuccessMsg.delete("Fixed Expense"));
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
