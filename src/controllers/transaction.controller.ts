import { Request, Response } from "express";
import { TransactionMsg, ErrorMsg } from "../config/msgs";
import { transactionService } from "../services";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    // Check if the user exists
    const result = await transactionService.createTransaction(req.body);

    res.status(201).send(TransactionMsg.create);
  } catch (err: any) {
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Check if the user exists

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

    res.status(201).send(result);
  } catch (err: any) {
    res.status(500).send(ErrorMsg.exceptionError);
  }
};
