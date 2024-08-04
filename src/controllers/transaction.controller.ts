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
