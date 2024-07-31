import { Request, Response } from "express";
import { TransactionMsg, ErrorMsg } from "../config/msgs";
import { transactionService, userService } from "../services";
import logger from "../utils/logger";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const isUser = userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await transactionService.createTransaction(req.body);

    res.status(201).send(TransactionMsg.create);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const { type, year, month } = req.query;
    let result: any;
    if (type === "expense") {
      result = await transactionService.getExpenses(
        userId,
        parseInt(year as string),
        parseInt(month as string),
      );
    } else {
      // income
      result = await transactionService.getIncomes(
        userId,
        parseInt(year as string),
        parseInt(month as string),
      );
    }

    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
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
        .send({ ...TransactionMsg.notFound, transactionId });
    }

    await transactionService.updateTransaction(transactionId, req.body);

    res.status(200).send(TransactionMsg.patch);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
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
        .send({ ...TransactionMsg.notFound, transactionId });
    }
    await transactionService.deleteTransaction(transactionId);
    res.status(200).send(TransactionMsg.delete);
  } catch (err) {
    logger.error(err);
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
