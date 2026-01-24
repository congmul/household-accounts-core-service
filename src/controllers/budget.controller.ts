import { Request, Response } from "express";
import { SuccessMsg, ErrorMsg } from "../config/msgs";
import { accountbookService, budgetService, userService } from "../services";
import logger from "../utils/logger";

export const createBudget = async (req: Request, res: Response) => {
  try {
    const { userId, accountBookId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    // Check if the account book exists
    const isAccountBook = await accountbookService.checkExist(
      userId,
      accountBookId,
    );
    if (!isAccountBook) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Account book"), accountBookId });
    }

    await budgetService.createBudget(req.body);

    res.status(201).send(SuccessMsg.create("budget"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};

export const createAllPreMonthBudget = async (req: Request, res: Response) => {
  try {
    const { userId, accountBookId } = req.body;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    // Check if the account book exists
    const isAccountBook = await accountbookService.checkExist(
      userId,
      accountBookId,
    );
    if (!isAccountBook) {
      return res
        .status(404)
        .send({ ...ErrorMsg.notFound("Account book"), accountBookId });
    }

    await budgetService.createAllPreMonthBudget(req.body);

    res.status(201).send(SuccessMsg.create("All previous month budgets"));
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const { userId, accountBookId } = req.params;
    // Check if the user exists
    const isUser = await userService.checkExist(userId);
    if (!isUser) {
      return res.status(404).send({ ...ErrorMsg.notFound("User"), userId });
    }

    const { year, month } = req.query;
    const result = await budgetService.getBudgets(
      userId,
      accountBookId,
      parseInt(year as string),
      parseInt(month as string),
    );
    res.status(200).send(result);
  } catch (err: any) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { budgetId } = req.params;
    // Check if the budget exists
    const budget = await budgetService.getBudget(budgetId);
    if (!budget) {
      return res.status(404).send({ ...ErrorMsg.notFound("Budget"), budgetId });
    }

    await budgetService.updateBudget(budgetId, req.body);

    res.status(200).send(SuccessMsg.update("Budget"));
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { budgetId } = req.params;
    // Check if the budget exists
    const budget = await budgetService.getBudget(budgetId);
    if (!budget) {
      return res.status(404).send({ ...ErrorMsg.notFound("Budget"), budgetId });
    }
    await budgetService.deleteBudget(budgetId);
    res.status(200).send(SuccessMsg.delete("Budget"));
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
